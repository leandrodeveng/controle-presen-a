import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassLessonController } from './classLesson.controller';
import { ClassLesson } from './classLesson.entity';
import { ClassLessonService } from './classLesson.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClassLesson])
  ],
  controllers: [ClassLessonController],
  providers: [ClassLessonService],
})

export class ClassLessonModule {}
