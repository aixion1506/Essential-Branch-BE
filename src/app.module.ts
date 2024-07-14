import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // 파일 경로
      load: [configuration], // 해당 파일에서 설정 로드
      isGlobal: true, // 전역 설정을 위해 true로 설정
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('USER_NAME'),
        password: configService.get<string>('DATABASE_PW'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [],
        synchronize: true, // 테이블 변경된 부분만 업데이트, 테이블 삭제후 생성X
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
