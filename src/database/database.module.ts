import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { PGProviders } from './pg/pg.providers';
import { DatabaseService } from './database.service';

@Module({
  providers: [...databaseProviders, ...PGProviders, DatabaseService],
  exports: [DatabaseService, ...databaseProviders],
})
export class DatabaseModule {}
