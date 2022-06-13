import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { checkWeightDTO } from './dto/check-weight.dto';
import { WeightEntity } from './entities/weight.entity';

@Injectable()
export class WeightService {
    constructor(@InjectRepository(WeightEntity) private weightrepository: Repository<WeightEntity>
    ) {}

    async create(dto: checkWeightDTO): Promise<number> {
        const weight =  WeightEntity.from(
            dto.squat,
            dto.benchpress,
            dto.deadlift
        );
        const { id } = await this.weightrepository.save(weight);
        return id;
    }
}
