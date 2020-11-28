import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassModule } from './class/class.module';
import { ClassLessonModule } from './classLesson/classLesson.module';
import { typeOrmConfig } from './config/typeorm.config';
import { PresenceModule } from './presence/presence.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ClassModule,
    StudentModule,
    ClassLessonModule,
    PresenceModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
