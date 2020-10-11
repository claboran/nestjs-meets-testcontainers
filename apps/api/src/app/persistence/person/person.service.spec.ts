import { PersonService } from './person.service';
import { getTestModuleFactory, openTestContainer } from '../../test-db/test-containers-helper';
import { StartedTestContainer } from 'testcontainers';
import { createDbFixture } from '../../test-db/test-db-fixture';
import { createTestPerson } from '../../test-db/test-db-create-person';
import { PersonEntity } from '../entities/person.entity';

describe('PersonService', () => {
  jest.setTimeout(50000);
  let service: PersonService;
  let container: StartedTestContainer;

  beforeAll(async () => {
    container = await openTestContainer();
    await createDbFixture(container.getMappedPort(5432));

    const module = await getTestModuleFactory(container);
    service = module.get<PersonService>(PersonService);
    return await createTestPerson(service);
  });

  afterAll(async () => {
    await container.stop();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find person',async () => {
    const person = await service.findById(1);
    expect(person).toEqual(<PersonEntity>{
      id: 1,
      firstName: 'Christian',
      lastName: 'Laboranowitsch',
      email: 'chris@laboranowitsch.de'
    })
  });
});
