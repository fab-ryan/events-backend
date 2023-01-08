import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EventsService {
    private readonly logger = new Logger(EventsService.name)

    constructor(
        @InjectRepository(Event)
        private readonly eventsRepository: Repository<Event>
    ) { }

    private getEventsBaseQuery() {
        return this.eventsRepository.createQueryBuilder('e')
            .orderBy('e.id', 'DESC')
    }


    public async getEvent(id: string): Promise<Event | undefined> {

        const query = this.getEventsBaseQuery()
            .andWhere('e.id = :id', { id });
        this.logger.debug(query.getSql())

        return await query.getOne();

    }
}