import * as Validator from "class-validator";

export class AdminRefreshTokenDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    token: string;
}