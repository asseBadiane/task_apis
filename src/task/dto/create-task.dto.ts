import { ApiProperty } from '@nestjs/swagger';

export enum Priority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export class CreateTaskDto {
  @ApiProperty({
    example: 'title',
    required: true,
  })
  title: string;
  @ApiProperty({
    example: 'content',
    required: true,
  })
  content: string;
  @ApiProperty({ example: 'High', enum: Priority })
  priority: Priority;
  @ApiProperty({
    example: 'color',
    required: true,
  })
  color: string;

  @ApiProperty({
    type: Date,
    required: false,
  })
  dueDate: Date;
}
