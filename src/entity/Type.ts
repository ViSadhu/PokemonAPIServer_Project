import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { Pokemon } from "./Pokemon";

@Entity()
export class Type {

    @PrimaryGeneratedColumn()
    @IsOptional()
    id: number;

    @Column('nvarchar', {length: 50})
    @Length(1, 50, {message: 'Name must be from $constraint1 to $constraint2 characters '})
    @IsNotEmpty({message: 'Name is required'})
    name: string;

    @ManyToMany(() => Pokemon, pokemon => pokemon.type)
    pokemon: Pokemon[];
}