import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty({
    example: 'username',
    required: true,
  })
  username: string;
  @ApiProperty({
    example: 'password',
    required: true,
  })
  password: string;
}
