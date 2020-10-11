import { DynamicModule, Module } from '@nestjs/common';
import { Host } from 'testcontainers/dist/docker-client-factory';
import { Port } from 'testcontainers/dist/port';
import { TypeOrmModule } from '@nestjs/typeorm';

export interface TestDbModuleConfig {
  username: string;
  password: string;
  database: string;
  host: Host;
  port: Port;
  entities: any[];
}

@Module({})
export class TestDbModule {

  static register(options: TestDbModuleConfig): DynamicModule {
    return {
      module: TestDbModule,
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          username: options.username,
          password: options.password,
          database: options.database,
          host: options.host ,
          port: options.port,
          entities: [
            ...options.entities
          ],
          synchronize: false,
          logging: true
        })
      ]
    }
  }
}
