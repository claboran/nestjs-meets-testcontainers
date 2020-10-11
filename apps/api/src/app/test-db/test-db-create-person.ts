import { PersonEntity } from '../persistence/entities/person.entity';
import { PersonService } from '../persistence/person/person.service';

export const createTestPerson = async (personService: PersonService): Promise<PersonEntity> => {
  const person2Create = new PersonEntity({
    firstName: 'Christian',
    lastName: 'Laboranowitsch',
    email: 'chris@laboranowitsch.de'
  });
  return await personService.create(person2Create);
};
