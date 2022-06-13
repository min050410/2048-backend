import { Body, Controller, Post } from '@nestjs/common';
import { checkWeightDTO } from './dto/check-weight.dto';
import { WeightService } from './weight.service';

@Controller('weight')
export class WeightController {
    constructor(private weightservice: WeightService)
    {}
    @Post('create')
    async checkTodayWeight(@Body() dto: checkWeightDTO): Promise<number> {
        const id = await this.weightservice.create(dto);
        return id;
    }
}
