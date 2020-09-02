import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Administrator } from './../../entities/administrator.entity';
import { Repository } from 'typeorm';
import { AddAdministratorDto } from 'src/dtos/administrator/add.administrator.dto';
import { EditAdministratorDto } from 'src/dtos/administrator/edit.administrator.dto';
import { ApiResponse } from 'src/misc/api.response.class';
import * as crypto from 'crypto';
import { UserToken } from 'src/entities/user-token-entity';
import { userInfo } from 'os';


@Injectable()
export class AdministratorService {
    constructor(
        @InjectRepository(Administrator) private readonly administrator: Repository<Administrator>,
        @InjectRepository(UserToken) private readonly userToken: Repository<UserToken>
    ) {}

    getAll(): Promise<Administrator[]> {
        return this.administrator.find();
    }

    async getByUsername(username:string): Promise<Administrator | null> {
        const admin = await this.administrator.findOne({
            username: username
        });

        if (admin) {
            return admin;
        }
        return null;
    }


    getById(id:number): Promise<Administrator> {
        return this.administrator.findOne(id);
    }

    add(data: AddAdministratorDto): Promise<Administrator | ApiResponse> {
        // storing new admin, converting password into hash 
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();
        let newAdmin: Administrator = new Administrator();
        newAdmin.username = data.username;
        newAdmin.passwordHash = passwordHashString;

        // handling duplicate entry error
        return new Promise((resolve => {
            this.administrator.save(newAdmin)
            .then(data => resolve(data))
            .catch(error => {
                const response: ApiResponse = new ApiResponse("error", -1001);
                resolve(response)
            });
        }));
    }
    
    async editById(id: number, data: EditAdministratorDto): Promise<Administrator | ApiResponse> {
        let admin: Administrator = await this.administrator.findOne(id);
        if (admin === undefined) {
            return new Promise((resolve) => {
                resolve(new ApiResponse("error", -1002));
            })
        }
        
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();
        admin.passwordHash = passwordHashString;

        return this.administrator.save(admin);
    }

    async addToken(userId: number, token: string, expiresAt: string) {
        const userToken = new UserToken();
        userToken.userId = userId;
        userToken.token = token;
        userToken.expiresAt = expiresAt;

        return await this.userToken.save(userToken);
    }

    async getUserToken(token: string): Promise<UserToken> {
        return await this.userToken.findOne({
            token: token,
        });
    }

    async invalidateToken(token: string): Promise<UserToken | ApiResponse> {
        const userToken = await this.userToken.findOne({
            token: token,
        });

        if (!userToken) {
            return new ApiResponse("error", -10001, "No such refresh token!");
        }

         userToken.isValid = 0;

         await this.userToken.save(userToken);

         return await this.getUserToken(token);

    }

    async invalidateUserTokens(userId: number): Promise<(UserToken | ApiResponse)[]> {
        const userTokens = await this.userToken.find({
            userId: userId,
        });

        const results = [];


        for(const userToken of userTokens) {
            results.push(this.invalidateToken(userToken.token));
        }

        return results;
    }
}
