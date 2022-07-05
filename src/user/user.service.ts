import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { Not } from 'typeorm';
import { changeNickNameDTO } from './dto/change-nickname-dto';
import { updateScoreDTO } from './dto/update-score-dto';
import { v4 as uuidv4 } from 'uuid';

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
        newUser.id = uuidv4();
        newUser.usercode = lastGuestId+1;
        newUser.nickname = 'Guest'+((lastGuestId+1).toString());
        newUser.scoreMaxNumber = 0;
        newUser.score = 0;
        await this.userRepository.save(newUser);      
        return 'Guest'+((lastGuestId+1).toString());
    }

    async getUser(guestId: number): Promise<UserEntity> {
        // console.log(dto.usercode);
        return await this.userRepository.findOne({ where:
            { usercode: guestId }
        }); 
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

    async getUUID(): Promise<string> {
        const getID = (await this.userRepository.findOne({
            where: {
                usercode: Not(0)
            },
            order: {
                usercode: 'DESC'
            }
        }))?.id?? null;
        return getID;
    }

    async changeNickName(dto: changeNickNameDTO) {
        console.log(dto.nickname);
        console.log(dto.id);
        this.userRepository.createQueryBuilder()
            .update()
            .set({ nickname : dto.nickname })
            .where("id = :id", { id: dto.id })
            .execute();
        return dto.nickname
    }

    async decipher(score: string, key: string) {
        const CryptoJS = require("crypto-js");
        const bytes = CryptoJS.DES.decrypt(score, key);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    }

    async updateScore(dto: updateScoreDTO) {

        // 최댓값 반영
        const nowscore = (await this.userRepository.findOne({
            where: {
                id: dto.id,
            },
        }))?.score?? 0;

        const nowscoreMaxNumber = (await this.userRepository.findOne({
            where: {
                id: dto.id,
            },
        }))?.scoreMaxNumber?? 0;

        const decryptedScore = await this.decipher(dto.score, process.env.CRYPTO_KEY);
        const decryptedScoreMaxNumber = await this.decipher(dto.scoreMaxNumber, process.env.CRYPTO_KEY);
        
        const updateScore = Math.max(decryptedScore, nowscore);
        const updatescoreMaxNumber = Math.max(decryptedScoreMaxNumber, nowscoreMaxNumber);

        this.userRepository.createQueryBuilder()
            .update()
            .set({ score : updateScore, scoreMaxNumber : updatescoreMaxNumber })
            .where("id = :id", { id: dto.id })
            .execute();

        return dto;
    }

    async ranking() {
        return await this.userRepository.createQueryBuilder()
        .select([
            'usercode',
            'nickname',
            'score',
            'scoreMaxNumber',
        ])
        .where('score != 0')
        .orderBy('score' , 'DESC')
        .addOrderBy('scoreMaxNumber', 'DESC')
        .getRawMany()
    }


}
