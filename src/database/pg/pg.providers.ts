import { Event } from './events.entity';
import { Booking } from './bookings.entity';

export const PGProviders = [
  {
    provide: 'EVENT',
    useValue: Event,
  },
  {
    provide: 'BOOKING',
    useValue: Booking,
  },
];
