import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Administrator } from './../../entities/administrator.entity';
import { Repository } from 'typeorm';
import { AddAdministratorDto } from 'src/dtos/administrator/add.administrator.dto';
import { EditAdministratorDto } from 'src/dtos/administrator/edit.administrator.dto';
import { promises } from 'fs';
import { response } from 'express';
import { ApiResponse } from 'src/misc/api.response.class';
import * as crypto from 'crypto';


@Injectable()
export class AdministratorService {
    constructor(
        @InjectRepository(Administrator) 
        private readonly administrator: Repository<Administrator>
    ) {}

    getAll(): Promise<Administrator[]> {
        return this.administrator.find();
    }

    getById(id:number): Promise<Administrator> {
        return this.administrator.findOne(id);
    }

    add(data: AddAdministratorDto): Promise<Administrator | ApiResponse> {
        // storing new admin, converting password into hash
        const crypto = require('crypto');
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

        const crypto = require('crypto');
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();
        admin.passwordHash = passwordHashString;

        return this.administrator.save(admin);

    }
}