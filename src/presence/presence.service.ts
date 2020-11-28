import { Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, IsNull, Repository } from "typeorm";
import { PresenceDto } from "./dto/presence.dto";
import { Presence } from "./presence.entity";

@Injectable({ scope: Scope.REQUEST })
export class PresenceService {
    constructor(
        @InjectRepository(Presence)
        private readonly presenceRepository: Repository<Presence>
    ) {}

    async getAll() {
        return await this.presenceRepository.find({
            where: {
                deletedAt: IsNull()
            }
        })
    }

    async create(presenceDto: PresenceDto, entityManager: EntityManager) {
        let presenceRepository = entityManager.getRepository(Presence)
        let {
            classLessonId,
            studentIds
        } = presenceDto
        let presences = studentIds.map(
            studentId => new Presence({
                classLessonId,
                studentId,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        )
        return await presenceRepository.insert(
            presences
        )
    }

    async delete(id: number, entityManager: EntityManager) {
        let presenceRepository = entityManager.getRepository(Presence)
        return await presenceRepository.update(
            id, 
            { deletedAt: new Date(), updatedAt: new Date() }
        )
    }
}