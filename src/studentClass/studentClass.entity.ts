import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StudentClass {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    studentId: number

    @Column()
    classId: number

    @Column({ nullable: true })
    createdAt: Date

    @Column({ nullable: true })
    updatedAt: Date

    @Column({ nullable: true })
    deletedAt: Date

    constructor(partial: Partial<StudentClass>) {
        Object.assign(this, partial);
    }
}