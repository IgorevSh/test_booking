import { IsInt, IsString, Min } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  @Min(1)
  event_id: number;

  @IsString()
  user_id: string;
}
