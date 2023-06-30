import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Queda } from 'src/typeorm/entities/queda';

@Controller('json')
export class DataController {
  constructor(
    @InjectRepository(Queda)
    private readonly yourEntityRepository: Repository<Queda>,
  ) {}

  @Post()
  async create(@Body() data: Queda): Promise<Queda> {
    console.log(data);  // Log incoming data
    try {
      return await this.yourEntityRepository.save(data);
    } catch (error) {
      console.error(error);  // Log the error
      throw new HttpException('Error saving data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}