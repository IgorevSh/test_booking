import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingController } from './booking.controller';
import { DatabaseModule } from '../database/database.module';
import { PGProviders } from '../database/pg/pg.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BookingController],
  providers: [BookingsService, ...PGProviders],
})
export class BookingsModule {}
