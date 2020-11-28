import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { ClassPresence } from "./classPresence.entity";
import { ClassPresenceService } from "./classPresence.service";
import { ClassPresenceDto } from "./dto/classPresence.dto";

@Controller('classPresence')
export class ClassPresenceController {
    constructor(
        private classPresenceService: ClassPresenceService,
        private entityManager: EntityManager
    ) {}

    @Get()
    async getAllClassPresences(): Promise<ClassPresence[]> {
        return await this.classPresenceService.getAll()
    }

    @Get(':id')
    async getClassPresenceByClassId(
        @Param('id') id: number,
    ): Promise<ClassPresence[]> {
        return await this.classPresenceService.getByClassId(id)
    }

    @Post()
    async createClassPresence(@Body() classPresenceDto: ClassPresenceDto) {
        return await this.entityManager.transaction(async transactionManager => {
            return await this.classPresenceService.create(
                classPresenceDto, 
                transactionManager
            );
        });
    }

    @Put(':id')
    async updateClassPresence(
        @Param('id') id: number, 
        @Body() classPresenceDto: ClassPresenceDto
    ) {
        return await this.entityManager.transaction(async transactionManager => {
            return await this.classPresenceService.update(
                id,
                classPresenceDto, 
                transactionManager
            );
        });
    }

    @Delete(':id')
    async deleteClassPresence(@Param('id') id: number) {
        return await this.entityManager.transaction(async transactionManager => {
            return await this.classPresenceService.delete(id, transactionManager);
        });
    }
}