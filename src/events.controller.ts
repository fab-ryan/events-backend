import { Controller, Get, Patch, Post, Delete, Param, Body, HttpCode, ParseIntPipe, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-events.dto';
import { Event } from './event.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Controller('/events')
export class EventsController {

    constructor(
        @InjectRepository(Event)
        private readonly repository: Repository<Event>,
    ) { }

    @Get()
    async findAll() {
        return await this.repository.find(
            {
                select: ['id', 'when'],
                take: 2,
                order: {
                    id: 'ASC'
                }
            }
        )
    }

    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id) {

        console.log(typeof id)
        const event = await this.repository.findOneOrFail({ where: { id } })
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
        const event = await this.repository.findOne(id);
        await this.repository.remove(event)

    }
}