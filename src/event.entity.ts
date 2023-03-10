import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('event')
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    name: string;

    @Column()
    description: string;

    @Column()
    when: Date;

    @Column()
    address: string
}