import { Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, IsNull, Repository } from "typeorm";
import { ClassLesson } from "./classLesson.entity";
import { ClassLessonDto } from './dto/classLesson.dto';

@Injectable({ scope: Scope.REQUEST })
export class ClassLessonService {
    constructor(
        @InjectRepository(ClassLesson)
        private readonly classLessonRepository: Repository<ClassLesson>
    ) {}

    async getAll() {
        return await this.classLessonRepository.find({
            where: {
                deletedAt: IsNull()
            }
        })
    }

    async getById(id: number) {
        return await this.classLessonRepository.findOne({
            where: {
                id,
                deletedAt: IsNull()
            }
        })
    }

    async create(classLessonDto: ClassLessonDto, entityManager: EntityManager) {
        let classLessonRepository = entityManager.getRepository(ClassLesson)
        let {
            classId,
            lessonContent,
            lessonDate
        } = classLessonDto
        return await classLessonRepository.insert(
            new ClassLesson({
                classId,
                lessonContent,
                lessonDate,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        )
    }

    async update(
        id: number, 
        classLessonDto: ClassLessonDto, 
        entityManager: EntityManager
    ) {
        let classLessonRepository = entityManager.getRepository(ClassLesson)
        let {
            classId,
            lessonContent,
            lessonDate
        } = classLessonDto
        return await classLessonRepository.update(
            id,
            {
                classId,
                lessonContent,
                lessonDate,
                updatedAt: new Date()
            }
        )
    }

    async delete(
        id: number, 
        entityManager: EntityManager
    ) {
        let classLessonRepository = entityManager.getRepository(ClassLesson)
        return await classLessonRepository.update(
            id, 
            { deletedAt: new Date(), updatedAt: new Date() }
        )
    }
}