import { Port } from 'testcontainers/dist/port';
import { Logger } from '@nestjs/common';
import * as pg from 'pg'

export const createPersonTblStmt =  'create table apischema.person_tbl (' +
  'id                      SERIAL PRIMARY KEY,' +
  'first_name              varchar(100) not null,' +
  'last_name               varchar(150) not null,' +
  'email                   varchar(150) not null' +
  ')';

export const createDbFixture = async (mappedPort: Port): Promise<void> => {
  const logger = new Logger(createDbFixture.name);
  const createSchemaStmt = 'CREATE SCHEMA apischema AUTHORIZATION testuser';


  const pool = new pg.Pool(
    {
      user: 'testuser',
      host: 'localhost',
      database: 'apidb',
      password: 'test',
      port: mappedPort,
    }
  );

  try {
    logger.debug(`Create DB: ${JSON.stringify(await pool.query(createSchemaStmt))}`);
    logger.debug(`Create user_table: ${JSON.stringify(await pool.query(createPersonTblStmt))}`);
  } catch (exc) {
    logger.error('Exception in db fixture', exc);
  }
  await pool.end();
};
