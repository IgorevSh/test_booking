import { Sequelize } from 'sequelize-typescript';
import { Event } from './pg/events.entity';
import { Booking } from './pg/bookings.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        logging: false,
      });

      sequelize.addModels([Event, Booking]);

      await sequelize.sync({ alter: true, force: false });
      console.log('✅ Database synchronized successfully');
      return sequelize;
    },
  },
];
