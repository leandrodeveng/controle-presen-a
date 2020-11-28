import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { ClassLesson } from "./classLesson.entity";
import { ClassLessonService } from "./classLesson.service";
import { ClassLessonDto } from "./dto/classLesson.dto";

@Controller('classLesson')
export class ClassLessonController {
    constructor(
        private classLessonService: ClassLessonService,
        private entityManager: EntityManager
    ) {}

    @Get()
    async getAllClassLessons(): Promise<ClassLesson[]> {
        return await this.classLessonService.getAll()
    }

    @Get(':id')
    async getOneClassLesson(
        @Param('id') id: number,
    ): Promise<ClassLesson> {
        return await this.classLessonService.getById(id)
    }

    @Post()
    async createClassLesson(@Body() classLessonDto: ClassLessonDto) {
        return await this.entityManager.transaction(async transactionManager => {
            return await this.classLessonService.create(
                classLessonDto, 
                transactionManager
            );
        });
    }

    @Put(':id')
    async updateClassLesson(
        @Param('id') id: number, 
        @Body() classLessonDto: ClassLessonDto
    ) {
        return await this.entityManager.transaction(async transactionManager => {
            return await this.classLessonService.update(
                id,
                classLessonDto, 
                transactionManager
            );
        });
    }

    @Delete(':id')
    async deleteClassLesson(@Param('id') id: number) {
        return await this.entityManager.transaction(async transactionManager => {
            return await this.classLessonService.delete(id, transactionManager);
        });
    }
}