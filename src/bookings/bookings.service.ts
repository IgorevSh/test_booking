import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class BookingsService {
  constructor(private databaseService: DatabaseService) {}
  async create(createBookingDto: CreateBookingDto) {
    const { event_id, user_id } = createBookingDto;

    const transaction = await this.databaseService.createTransaction();
    try {
      const event = await this.databaseService.findEventById(
        event_id,
        transaction,
      );
      if (!event) {
        throw new NotFoundException('Мероприятие не найдено');
      }

      const existingBooking = await this.databaseService.findBooking(
        event_id,
        user_id,
        transaction,
      );

      if (existingBooking) {
        throw new ConflictException(
          'Пользователь уже забронировал место на это мероприятие',
        );
      }
      const bookedCount = await this.databaseService.countBookings(
        event_id,
        transaction,
      );
      if (bookedCount >= event.total_seats) {
        throw new ConflictException('Нет свободных мест на мероприятие');
      }
      const newBook = await this.databaseService.createBooking(
        event_id,
        user_id,
        transaction,
      );

      await transaction.commit();

      return newBook;
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  async findOne(user_id: number) {
    return await this.databaseService.getUsersEvents(user_id);
  }
}
