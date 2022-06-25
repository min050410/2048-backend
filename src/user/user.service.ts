import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { LessThan, Not } from 'typeorm';
import { changeNickNameDTO } from './dto/change-nickname-dto';
import {getConnection} from "typeorm";
import { updateScoreDTO } from './dto/update-score-dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

    async saveUser(): Promise<string> {
        const lastGuestId: number = (await this.userRepository.findOne({
            where: {
                usercode: Not(0)
            },
            order: {
                usercode: 'DESC'
            }
        }))?.usercode?? 0;
        const newUser = this.userRepository.create();
        console.log(lastGuestId+1);
        newUser.nickname = 'Guest'+((lastGuestId+1).toString());
        newUser.scoreMaxNumber = 0;
        newUser.score = 0;
        await this.userRepository.save(newUser);      
        return 'Guest'+((lastGuestId+1).toString());
    }

    async getUser(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async getGuestId(): Promise<number> {
        const lastGuestId = (await this.userRepository.findOne({
            where: {
                usercode: Not(0)
            },
            order: {
                usercode: 'DESC'
            }
        }))?.usercode?? 0;
        return lastGuestId;
    }

    async changeNickName(dto: changeNickNameDTO) {
        this.userRepository.createQueryBuilder()
            .update()
            .set({ nickname : dto.nickname })
            .where("usercode = :usercode", { usercode: dto.usercode })
            .execute();
        return dto.nickname
    }

    async updateScore(dto: updateScoreDTO) {
        this.userRepository.createQueryBuilder()
            .update()
            .set({ score : dto.score, scoreMaxNumber : dto.scoreMaxNumber })
            .where("usercode = :usercode", { usercode: dto.usercode })
            .execute();
        return dto;
    }

    async ranking() {
        return this.userRepository.createQueryBuilder()
        .select([
            'nickname',
            'score',
            'scoreMaxNumber',
        ])
        .orderBy('score' , "DESC")
        .getRawMany()
    }
}
