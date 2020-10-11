import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonEntity } from '../entities/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonService {

  constructor(@InjectRepository(PersonEntity) private personRepository: Repository<PersonEntity>) {}

  async create(person: PersonEntity): Promise<PersonEntity> {
    return await this.personRepository.save(person);
  }

  async findAll(): Promise<PersonEntity[]> {
    return await this.personRepository.find();
  }

  async findById(id: number): Promise<PersonEntity> {
    return await this.personRepository.findOne(id);
  }

}
