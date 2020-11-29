import { Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, IsNull, Repository } from "typeorm";
import { Class } from "./class.entity";
import { ClassDto } from "./dto/class.dto";

@Injectable({ scope: Scope.REQUEST })
export class ClassService {
    constructor(
        @InjectRepository(Class)
        private readonly classRepository: Repository<Class>
    ) {}

    async getAll() {
        return await this.classRepository.find({
            where: {
                deletedAt: IsNull()
            }
        })
    }

    async getById(id: number) {
        return await this.classRepository.findOne({
            where: {
                id,
                deletedAt: IsNull()
            }
        })
    }

    async getByName(name: number) {
        return await this.classRepository.findOne({
            where: {
                name,
                deletedAt: IsNull()
            }
        })
    }

    async getClassByName(name: string) {
        return await this.classRepository.findOne({
            where: {
                name,
                deletedAt: IsNull()
            }
        })
    }

    async getClassByCode(classCode: string) {
        return await this.classRepository.findOne({
            where: {
                classCode,
                deletedAt: IsNull()
            }
        })
    }

    async create(classDto: ClassDto, entityManager: EntityManager) {
        let classRepository = entityManager.getRepository(Class)
        let {
            name, 
            classCode, 
            description,
            period
        } = classDto
        return await classRepository.insert(
            new Class({
                name,
                classCode,
                period,
                description,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        )
    }

    async update(id: number, classDto: ClassDto, entityManager: EntityManager) {
        let classRepository = entityManager.getRepository(Class)
        let {
            name, 
            classCode,
            period, 
            description
        } = classDto
        return await classRepository.update(
            id,
            {
                name,
                classCode,
                period,
                description,
                updatedAt: new Date()
            }
        )
    }

    async delete(id: number, entityManager: EntityManager) {
        let classRepository = entityManager.getRepository(Class)
        return await classRepository.update(
            id, 
            { deletedAt: new Date(), updatedAt: new Date() }
        )
    }
}