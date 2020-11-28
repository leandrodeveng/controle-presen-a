import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { Class } from "./class.entity";
import { ClassService } from "./class.service";
import { ClassDto } from "./dto/class.dto";

@Controller('class')
export class ClassController {
    constructor(
        private classService: ClassService,
        private entityManager: EntityManager
    ) {}

    @Get()
    async getAllClasses(): Promise<Class[]> {
        return await this.classService.getAll()
    }

    @Get(':id')
    async getOneClass(
        @Param('id') id: number,
    ): Promise<Class> {
        return await this.classService.getById(id)
    }

    @Post()
    async createClass(@Body() classDto: ClassDto) {
        return await this.entityManager.transaction(async transactionManager => {
            return await this.classService.create(classDto, transactionManager);
        });
    }

    @Put(':id')
    async updateClass(
        @Param('id') id: number, 
        @Body() classDto: ClassDto
    ) {
        return await this.entityManager.transaction(async transactionManager => {
            return await this.classService.update(id, classDto, transactionManager);
        });
    }

    @Delete(':id')
    async deleteClass(@Param('id') id: number) {
        return await this.entityManager.transaction(async transactionManager => {
            return await this.classService.delete(id, transactionManager);
        });
    }
}