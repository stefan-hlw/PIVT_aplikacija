import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Category } from "src/entities/category.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CategoryService extends TypeOrmCrudService<Category> {
    constructor(
        @InjectRepository(Category)
        private readonly category: Repository<Category> 
     ) {
         super(category);
     }
}