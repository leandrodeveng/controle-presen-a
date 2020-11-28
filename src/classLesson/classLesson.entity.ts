import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ClassLesson {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    classId: number

    @Column()
    lessonDate: Date

    @Column()
    lessonContent: String

    @Column({ nullable: true })
    createdAt: Date

    @Column({ nullable: true })
    updatedAt: Date

    @Column({ nullable: true })
    deletedAt: Date

    constructor(partial: Partial<ClassLesson>) {
        Object.assign(this, partial);
    }
}