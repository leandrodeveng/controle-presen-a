import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ClassPresence {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    classId: number

    @Column()
    lessonDate: Date

    @Column()
    student: string

    @Column()
    presence: Boolean

    @Column({ nullable: true })
    createdAt: Date

    @Column({ nullable: true })
    updatedAt: Date

    @Column({ nullable: true })
    deletedAt: Date

    constructor(partial: Partial<ClassPresence>) {
        Object.assign(this, partial);
    }
}