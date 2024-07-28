import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Headers,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Task } from './entities/task.entity';

@ApiBearerAuth()
@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Task,
  })
  create(
    @Headers('Authorization') auth: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    const jwt = auth.replace('Bearer ', '');
    return this.taskService.create(jwt, createTaskDto);
  }

  @Get()
  findAll(@Headers('Authorization') auth: string) {
    const jwt = auth.replace('Bearer ', '');
    return this.taskService.findAll(jwt);
  }

  @Get(':id')
  findOne(@Headers('Authorization') auth: string, @Param('id') id: string) {
    const jwt = auth.replace('Bearer ', '');
    return this.taskService.findOne(jwt, +id);
  }

  @Patch(':id')
  update(
    @Headers('Authorization') auth: string,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const jwt = auth.replace('Bearer ', '');
    return this.taskService.update(jwt, +id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Headers('Authorization') auth: string, @Param('id') id: string) {
    const jwt = auth.replace('Bearer ', '');
    return this.taskService.remove(jwt, +id);
  }
}
