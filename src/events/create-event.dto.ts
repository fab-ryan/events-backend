import { IsDateString, IsString, Length } from 'class-validator';

export class CreateEventDto {
    @IsString()
    @Length(5, 255, { message: 'samething is wrong' })
    name: string;
    @Length(5, 255, { message: 'samething is wrong' })
    description: string;
    @IsDateString()
    when: string;
    @Length(5, 255, { message: 'samething is wrong' })
    address: string
}