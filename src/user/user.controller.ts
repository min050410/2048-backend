import { Body, Controller, Get, Post } from '@nestjs/common';
import { changeNickNameDTO } from './dto/change-nickname-dto';
import { updateScoreDTO } from './dto/update-score-dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Post('create')
    async createUser():Promise<string> {
        return await this.userService.saveUser();
    }

    @Get('getID')
    async getId(): Promise<number> {
        return await this.userService.getGuestId();
    }

    @Get('getUser')
    async getUser(): Promise<UserEntity[]> {
        return this.userService.getUser();
    }

    @Post('change')
    async changeUserName(@Body() dto: changeNickNameDTO): Promise<string> {
        return await this.userService.changeNickName(dto);
    }
    
    @Post('score')
    async updateScore(@Body() dto: updateScoreDTO): Promise<updateScoreDTO> {
        return await this.userService.updateScore(dto);
    }

    @Get('rank')
    async ranking() {
        return await this.userService.ranking();
    }
}
