import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
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
        let nameExists = await this.classService
            .getClassByName(classDto.name)
        let classCodeExists = await this.classService
            .getClassByCode(classDto.classCode)

        if(nameExists || classCodeExists) {
            throw new BadRequestException(
                'Não é possível criar uma turma com um nome ou codigo já existente.'
            )
        }

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

    // @Delete(':id')
    // async deleteClass(@Param('id') id: number) {
    //     return await this.entityManager.transaction(async transactionManager => {
    //         return await this.classService.delete(id, transactionManager);
    //     });
    // }

    @Delete(':name')
    async deleteClassByName(@Param('name') name: string) {
        let classExists = await this.classService.getClassByName(name)
        if(!classExists) {
            throw new BadRequestException('Não existe uma turma cadastrada com esse nome')
        }

        return await this.entityManager.transaction(async transactionManager => {
            return await this.classService.delete(classExists.id, transactionManager);
        });
    }
}