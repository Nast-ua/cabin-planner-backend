import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [
    ReservationsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true, // ONLY FOR DEVELOPMENT
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
