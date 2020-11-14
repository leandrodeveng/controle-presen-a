import { Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, IsNull, Repository } from "typeorm";
import { StudentDto } from "./dto/student.dto";
import { Student } from "./student.entity";

@Injectable({ scope: Scope.REQUEST })
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>
    ) {}

    async getAll() {
        return await this.studentRepository.find({
            where: {
                deletedAt: IsNull()
            }
        })
    }

    async create(studentDto: StudentDto, entityManager: EntityManager) {
        let studentRepository = entityManager.getRepository(Student)
        let {
            name, 
            email, 
            phoneNumber, 
            registration 
        } = studentDto
        return await studentRepository.insert(
            new Student({
                name,
                email,
                phoneNumber,
                registration,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        )
    }

    async update(id: number, studentDto: StudentDto, entityManager: EntityManager) {
        let studentRepository = entityManager.getRepository(Student)
        let {
            name, 
            email, 
            phoneNumber, 
            registration 
        } = studentDto
        return await studentRepository.update(
            id,
            {
                name,
                email,
                phoneNumber,
                registration,
                updatedAt: new Date()
            }
        )
    }

    async delete(id: number, entityManager: EntityManager) {
        let studentRepository = entityManager.getRepository(Student)
        return await studentRepository.update(
            id, 
            { deletedAt: new Date(), updatedAt: new Date() }
        )
    }
}