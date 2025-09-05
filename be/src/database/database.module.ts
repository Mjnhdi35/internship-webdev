import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';
import { DataSourceOptions } from 'typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow<string>('database.host'),
        port: configService.getOrThrow<number>('database.port'),
        username: configService.getOrThrow<string>('database.username'),
        password: configService.getOrThrow<string>('database.password'),
        database: configService.getOrThrow<string>('database.database'),
        entities:
          configService.getOrThrow<DataSourceOptions['entities']>(
            'database.entities',
          ),
        migrations: configService.getOrThrow<DataSourceOptions['migrations']>(
          'database.migrations',
        ),
        synchronize: configService.getOrThrow<boolean>('database.synchronize'),
        logging: configService.getOrThrow<boolean>('database.logging'),
        autoLoadEntities: true,
      }),
    }),
  ],
  providers: [DatabaseService],
  exports: [TypeOrmModule, DatabaseService],
})
export class DatabaseModule {}
