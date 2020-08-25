import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { MeasuringUnit } from "src/entities/measuring-unit.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class MeasuringUnitService extends TypeOrmCrudService<MeasuringUnit> {
    constructor(
        @InjectRepository(MeasuringUnit)
        private readonly munit: Repository<MeasuringUnit> 
     ) {
         super(munit);
     }
}