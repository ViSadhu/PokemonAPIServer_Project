import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('nvarchar', {length: 50, nullable: true})
  username: string;

  @Column('nvarchar', {length: 50, nullable: true})
  password: string; 
  
  @Column('nvarchar', {length: 50, nullable: true})
  token: string; // Bearer token for authentication

  @Column('nvarchar', {length: 50, nullable: true})
  accessLevel: string; // "read", "write", or "admin"

}
