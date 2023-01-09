import { Controller, Get, Patch, Post, Delete, Param, Body, HttpCode, ParseUUIDPipe, Logger, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-events.dto';
import { Event } from './event.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventsService } from './events.service';


@Controller('/events')
export class EventsController {
    private readonly logger = new Logger(EventsController.name);

    
    constructor(
        @InjectRepository(Event)
        private readonly repository: Repository<Event>,
        private readonly eventsServices: EventsService
    ) { }

    @Get()
    async findAll() {
        this.logger.log(`Hi the findAll route`);
        const events = await this.repository.find(
            {
                select: ['id', 'when'],
                take: 2,
                order: {
                    id: 'ASC'
                }
            }
        )
        this.logger.debug(`Found ${events.length} events`);
        return events
    }

    @Get(':id')
    async findOne(@Param('id') id) {
        // try {

        //     const event = this.eventServices.getEvent(id)
        // } catch (error) {

        //     throw new HttpException({
        //         status: HttpStatus.FORBIDDEN,
        //         error: 'No data found'

        //     },
        //         HttpStatus.FORBIDDEN,
        //         {
        //             cause: error
        //         }
        //     )
        // }
        // this.eventsServices.getEvent(id)  undefined why ?
        const event = await this.eventsServices.getEvent(id)

        if (!event) {
            throw new NotFoundException()
        }
        
        return event

    }

    @Post()
    async create(@Body() input: CreateEventDto) {
        try {

            const event = this.repository.save({
                ...input,
                when: new Date(input.when),
            });
            // this.events.push(event);
            return event;
        } catch (error) {
            return error

        }


    }

    @Patch(':id')
    async update(@Param('id') id, @Body() input: UpdateEventDto) {
        const event = await this.repository.findOne(id);


        const res = await this.repository.save({
            ...event,
            when: input.when ?
                new Date(input.when) : event.when
        })
        return res
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(
        @Param('id') id
    ) {
        const event = await this.repository.findOne({
            where: { id }
        });
        await this.repository.remove(event)

    }
}