import { DataSource } from 'typeorm';
import { Pokemon } from './entity/Pokemon';
import { Type } from './entity/Type'; 
import { User } from './entity/User';

export const AppDataSource = new DataSource({
    type: 'sqlite', // e.g., 'mysql', 'postgres', etc.
    database: './database.sqlite',
    synchronize: true,
    logging: false,
    entities: [Pokemon, Type, User],
    migrations: [], // Add your migration files here
    subscribers: [], // Add your subscriber files here
});