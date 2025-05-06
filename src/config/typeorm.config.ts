import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

export const typeOrmAsyncConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  url: config.get<string>('DATABASE_URL'),
  synchronize: true,
  autoLoadEntities: true,
  entities: [path.resolve(__dirname, '..', 'modules', '**', '*.entity.{ts,js}')],
});
