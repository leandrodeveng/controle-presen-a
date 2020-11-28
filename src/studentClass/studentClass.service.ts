import { Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, IsNull, Repository } from "typeorm";
import { StudentClassDto } from "./dto/studentClass.dto";
import { StudentClass } from "./studentClass.entity";

@Injectable({ scope: Scope.REQUEST })
export class StudentClassService {
    constructor(
        @InjectRepository(StudentClass)
        private readonly studentClassRepository: Repository<StudentClass>
    ) {}

    async insertStudentsInClass(
        studentClassDto: StudentClassDto, 
        entityManager: EntityManager
    ) {
        let studentClassRepository = entityManager.getRepository(StudentClass)
        let {
            classId,
            studentIds
        } = studentClassDto
        let studentClassesToCreate = studentIds.map(
            studentId => 
                new StudentClass({
                    classId,
                    studentId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
            )
        return await studentClassRepository.insert(
            studentClassesToCreate
        )
    }

    async removeStudentFromClass(
        id: number, 
        entityManager: EntityManager
    ) {
        let studentClassRepository = entityManager.getRepository(StudentClass)
        return await studentClassRepository.update(
            id, 
            { deletedAt: new Date(), updatedAt: new Date() }
        )
    }
}