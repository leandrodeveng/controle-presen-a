import { Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, IsNull, Repository } from "typeorm";
import { ClassPresence } from "./classPresence.entity";
import { ClassPresenceDto } from "./dto/classPresence.dto";

@Injectable({ scope: Scope.REQUEST })
export class ClassPresenceService {
    constructor(
        @InjectRepository(ClassPresence)
        private readonly classPresenceRepository: Repository<ClassPresence>
    ) {}

    async getAll() {
        return await this.classPresenceRepository.find({
            where: {
                deletedAt: IsNull()
            }
        })
    }

    async getByClassId(id: number) {
        return await this.classPresenceRepository.find({
            where: {
                classId: id,
                deletedAt: IsNull()
            }
        })
    }

    async getById(id: number) {
        return await this.classPresenceRepository.findOne({
            where: {
                id,
                deletedAt: IsNull()
            }
        })
    }

    async create(classPresenceDto: ClassPresenceDto, entityManager: EntityManager) {
        let classPresenceRepository = entityManager.getRepository(ClassPresence)
        let {
            classId,
            presence,
            student,
            lessonDate
        } = classPresenceDto
        return await classPresenceRepository.insert(
            new ClassPresence({
                classId,
                presence,
                student,
                lessonDate,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        )
    }

    async update(
        id: number, 
        classPresenceDto: ClassPresenceDto, 
        entityManager: EntityManager
    ) {
        let classPresenceRepository = entityManager.getRepository(ClassPresence)
        let {
            presence,
            student,
            lessonDate
        } = classPresenceDto
        return await classPresenceRepository.update(
            id,
            {
                presence,
                lessonDate,
                student,
                updatedAt: new Date()
            }
        )
    }

    async delete(
        id: number, 
        entityManager: EntityManager
    ) {
        let classPresenceRepository = entityManager.getRepository(ClassPresence)
        return await classPresenceRepository.update(
            id, 
            { deletedAt: new Date(), updatedAt: new Date() }
        )
    }
}