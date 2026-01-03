import { Inject, Injectable } from '@nestjs/common';
import { Event } from './pg/events.entity';
import { Booking } from './pg/bookings.entity';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DatabaseService {
  constructor(
    @Inject('EVENT')
    private events: typeof Event,
    @Inject('BOOKING')
    private booking: typeof Booking,
    @Inject('SEQUELIZE')
    private sequelize: Sequelize,
  ) {}
  //TODO:  проект небольшой, так что запросов немного, выделил в отдельный service
  async createTransaction(options?: {
    isolationLevel?: Transaction.ISOLATION_LEVELS;
  }): Promise<Transaction> {
    return this.sequelize.transaction({
      isolationLevel:
        options?.isolationLevel || Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
    });
  }

  async findEventById(event_id: number, transaction?: Transaction) {
    return await this.events.findOne({
      where: { id: event_id },
      transaction,
      raw: true,
    });
  }
  async countBookings(event_id: number, transaction?: Transaction) {
    return await this.booking.count({
      where: { event_id },
      transaction,
    });
  }
  async createBooking(
    event_id: number,
    user_id: string,
    transaction?: Transaction,
  ) {
    return await this.booking.create({ event_id, user_id }, { transaction });
  }
  async getUsersEvents(user_id: string) {
    return await this.booking.findAll({ where: { user_id } });
  }
  async findBooking(
    event_id: number,
    user_id?: string,
    transaction?: Transaction,
  ) {
    return await this.booking.findOne({
      where: { event_id, user_id },
      transaction,
      raw: true,
    });
  }
}
