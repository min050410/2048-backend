import { IsNumber, IsString } from "class-validator";

export class changeNickNameDTO {
    
    @IsString()
    id: string;
    
    @IsString()
    nickname: string;
}