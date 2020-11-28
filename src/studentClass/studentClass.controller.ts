import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { StudentClass } from "./studentClass.entity";

@Controller('studentClass')
export class StudentClassController {
    constructor(
        private studentClassService: StudentClass,
        private entityManager: EntityManager
        
        ) {}

    // @Post()
    // async createStudent(@Body() classDto: StudentDto) {
    //     return await this.entityManager.transaction(async transactionManager => {
    //         return await this.studentService.create(classDto, transactionManager);
    //     });
    // }

    // @Put(':id')
    // async updateStudent(
    //     @Param('id') id: number, 
    //     @Body() classDto: StudentDto
    // ) {
    //     return await this.entityManager.transaction(async transactionManager => {
    //         return await this.studentService.update(id, classDto, transactionManager);
    //     });
    // }

    // @Delete(':id')
    // async deleteStudent(@Param('id') id: number) {
    //     return await this.entityManager.transaction(async transactionManager => {
    //         return await this.studentService.delete(id, transactionManager);
    //     });
    // }
}