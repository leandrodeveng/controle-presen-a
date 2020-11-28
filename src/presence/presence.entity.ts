import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Presence {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    studentId: number

    @Column()
    classLessonId: number
    
    @Column({ nullable: true })
    createdAt: Date

    @Column({ nullable: true })
    updatedAt: Date

    @Column({ nullable: true })
    deletedAt: Date

    constructor(partial: Partial<Presence>) {
        Object.assign(this, partial);
    }
}