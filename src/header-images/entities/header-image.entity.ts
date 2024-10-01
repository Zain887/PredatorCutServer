import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HeaderImage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    url: string;

    @Column()
    article: string;
}
