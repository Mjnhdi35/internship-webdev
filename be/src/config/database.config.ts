import 'dotenv/config';
import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const databaseConfig = registerAs('database', () => ({
  type: 'mysql' as const,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  migrationsRun: false,
  dropSchema: false,
}));

export const databaseOptions: DataSourceOptions = {
  ...databaseConfig(),
};

export const AppDataSource = new DataSource(databaseOptions);
