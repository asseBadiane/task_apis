import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task)
    private taskRepository: typeof Task,
  ) {}

  create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.create(createTaskDto as any);
  }

  findAll() {
    return this.taskRepository.findAll();
  }

  findOne(id: number) {
    return this.taskRepository.findOne({ where: { id } });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const condition = { where: { id: id } };
    this.taskRepository.update(updateTaskDto as any, condition);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.taskRepository.destroy({ where: { id } });
    return result > 0;
  }
}
