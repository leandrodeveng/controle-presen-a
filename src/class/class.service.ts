import { Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Class } from "./class.entity";
import { ClassDto } from "./dto/class.dto";

@Injectable({ scope: Scope.REQUEST })
export class ClassService {
    constructor(
        @InjectRepository(Class)
        private readonly classRepository: Repository<Class>
    ) {}

    async getAll() {
        return await this.classRepository.find()
    }

    create(classDto: ClassDto) {
        
    }
}