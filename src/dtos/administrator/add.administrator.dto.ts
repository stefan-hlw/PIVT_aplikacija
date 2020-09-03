import * as Validator from 'class-validator'

export class AddAdministratorDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    username: string;

    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.Length(5, 128)
    password: string;    
}