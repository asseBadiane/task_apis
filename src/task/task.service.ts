import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/utils/constant';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task)
    private taskRepository: typeof Task,
    private jwtService: JwtService,
  ) {}

  create(jwt: string, createTaskDto: CreateTaskDto) {
    try {
      const task: Task = createTaskDto as Task;
      const user = this.jwtService.verify(jwt, {
        secret: jwtConstants.secret,
      });
      const userId = user.sub;
      task.userId = userId;
      console.log(task);
      return this.taskRepository.create(task as any);
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  findAll(jwt: string) {
    try {
      const user = this.jwtService.verify(jwt, {
        secret: jwtConstants.secret,
      });
      const userId = user.sub;
      return this.taskRepository.findAll({ where: { userId } });
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  findOne(jwt: string, id: number) {
    return this.taskRepository.findOne({ where: { id } });
  }

  update(jwt: string, id: number, updateTaskDto: UpdateTaskDto) {
    const condition = { where: { id: id } };
    this.taskRepository.update(updateTaskDto as any, condition);
    return this.findOne(jwt, id);
  }

  async remove(jwt: string, id: number) {
    const result = await this.taskRepository.destroy({ where: { id } });
    return result > 0;
  }
}
