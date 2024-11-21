import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { IsNotEmpty, IsNumber, IsOptional, Length, MaxLength } from "class-validator"
import { Type } from "./Type"

@Entity()
export class Pokemon {

    @PrimaryGeneratedColumn()
    @IsOptional()
    id: number
    
    @Column('nvarchar', {length: 50})
    @Length(1, 50, {message: 'Name must be from $constraint1 to $constraint2 characters '})
    @IsNotEmpty({message: 'Name is required'})
    name: string

    @Column('integer')
    @IsNumber()
    level: number

    @ManyToMany(() => Type, type => type.pokemon)
    @JoinTable()
    type: Type[]
}