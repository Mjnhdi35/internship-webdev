import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  getDataSource(): DataSource {
    return this.dataSource;
  }

  getManager(): EntityManager {
    return this.dataSource.manager;
  }
}
