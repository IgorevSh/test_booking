import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
  Unique,
  CreatedAt,
} from 'sequelize-typescript';
import { Event } from './events.entity';
@Table({
  tableName: 'bookings',
  timestamps: false,
})
export class Booking extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare id: number;

  @ForeignKey(() => Event)
  @Unique('idx_bookings_event_id')
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  event_id: number;

  @Unique('idx_bookings_event_id')
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  user_id: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: 'created_at',
  })
  created_at: Date;

  @BelongsTo(() => Event)
  event: Event;
}
