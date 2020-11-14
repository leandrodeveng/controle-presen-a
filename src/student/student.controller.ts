import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { StudentDto } from "./dto/student.dto";
import { Student } from "./student.entity";
import { StudentService } from "./student.service";

@Controller('student')
export class StudentController {
    constructor(
        private studentService: StudentService,
        private entityManager: EntityManager
        
        ) {}

    @Get()
    async getAllStudents(): Promise<Student[]> {
        return await this.studentService.getAll()
    }

    @Post()
    async createStudent(@Body() classDto: StudentDto) {
        return await this.entityManager.transaction(async transactionManager => {
            return await this.studentService.create(classDto, transactionManager);
        });
    }

    @Put(':id')
    async updateStudent(
        @Param('id') id: number, 
        @Body() classDto: StudentDto
    ) {
        return await this.entityManager.transaction(async transactionManager => {
            return await this.studentService.update(id, classDto, transactionManager);
        });
    }

    @Delete(':id')
    async deleteStudent(@Param('id') id: number) {
        return await this.entityManager.transaction(async transactionManager => {
            return await this.studentService.delete(id, transactionManager);
        });
        
    }
}