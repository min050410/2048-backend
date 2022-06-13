import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeightEntity } from './entities/weight.entity';
import { WeightController } from './weight.controller';
import { WeightService } from './weight.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([WeightEntity]),
    ],
    controllers: [WeightController],
    providers: [WeightService]
})
export class WeightModule {}
