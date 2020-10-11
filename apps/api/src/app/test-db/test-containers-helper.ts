import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { Test, TestingModule } from '@nestjs/testing';
import { TestDbModule } from './test-db.module';
import { PersonEntity } from '../persistence/entities/person.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonService } from '../persistence/person/person.service';
import { Logger } from '@nestjs/common';

/**
 * Starts a postgres testcontainer with docker
 */
export const openTestContainer = async (): Promise<StartedTestContainer> => {
  const logger = new Logger(openTestContainer.name);

  const container = await new GenericContainer("postgres")
    .withEnv('POSTGRES_USER', 'testuser')
    .withEnv('POSTGRES_PASSWORD', 'test')
    .withEnv('POSTGRES_DB', 'apidb')
    .withExposedPorts(5432)
    .start();

  const stream = await container.logs();
  stream
    .on("data", line => logger.debug(line))
    .on("err", line => logger.error(line))
    .on("end", () => logger.debug('Docker Container Stream closed...'));

  return container;
};

/**
 * Configures and registers a TestModule Factory for real persistence testing.
 *
 * @param container
 */
export const getTestModuleFactory = async (container: StartedTestContainer): Promise<TestingModule> =>
  await Test.createTestingModule({
    imports: [
      TestDbModule.register({
        username: 'testuser',
        password: 'test',
        database: 'apidb',
        host: container.getContainerIpAddress(),
        port: container.getMappedPort(5432),
        entities: [
          PersonEntity
        ],
      }),
      TypeOrmModule.forFeature([
        PersonEntity
      ])
    ],
    providers: [
      PersonService
    ],
  }).compile();
