import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { MeasuringUnit } from "src/entities/measuring-unit.entity";
import { MeasuringUnitService } from "src/services/measuring-unit/measuring-unit.service";

@Controller('api/munit')
@Crud({
    model: {
        type: MeasuringUnit
    },
    params: {
        id: {
            field: 'munitId',
            type: 'number',
            primary: true
        }
    },
   
    }
)
export class MeasuringUnitController {
    constructor(public service: MeasuringUnitService) {}
}