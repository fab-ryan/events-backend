import { registerAs } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Event } from 'src/events/event.entity'
export default registerAs(
    'orm.config',
    (): TypeOrmModule => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Event],
        synchronize: false
    }))