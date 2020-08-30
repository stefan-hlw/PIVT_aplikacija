import * as Validator from 'class-validator'

export class EditAdministratorDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(5, 128)
    password: string;    
}