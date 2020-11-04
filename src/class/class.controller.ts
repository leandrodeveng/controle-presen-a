import { Body, Controller, Get, Post } from "@nestjs/common";
import { Class } from "./class.entity";
import { ClassService } from "./class.service";
import { ClassDto } from "./dto/class.dto";

@Controller('class')
export class ClassController {
    constructor(private classService: ClassService) {}

    @Get()
    async getAllClasses(): Promise<Class[]> {
        return await this.classService.getAll()
    }

    @Post()
    createClass(@Body() classDto: ClassDto) {
        console.log(classDto)
    }
}