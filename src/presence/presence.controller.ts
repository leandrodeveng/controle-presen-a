import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { PresenceDto } from "./dto/presence.dto";
import { Presence } from "./presence.entity";
import { PresenceService } from "./presence.service";

@Controller('presence')
export class PresenceController {
    constructor(
        private presenceService: PresenceService,
        private entityManager: EntityManager
    ) {}

    @Get()
    async getAllPresences(): Promise<Presence[]> {
        return await this.presenceService.getAll()
    }

    @Post()
    async createPresence(@Body() presenceDto: PresenceDto) {
        return await this.entityManager.transaction(async transactionManager => {
            return await this.presenceService.create(presenceDto, transactionManager);
        });
    }

    @Delete(':id')
    async deletePresence(@Param('id') id: number) {
        return await this.entityManager.transaction(async transactionManager => {
            return await this.presenceService.delete(id, transactionManager);
        });
    }
}