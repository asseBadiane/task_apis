import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequestDto {
  @ApiProperty({
    example: 'nom',
    required: true,
  })
  nom: string;
  @ApiProperty({
    example: 'prenom',
    required: true,
  })
  prenom: string;
  @ApiProperty({
    example: 'email',
    required: false,
  })
  email?: string;
  @ApiProperty({
    example: 'password',
    required: true,
  })
  password: string;
  @ApiProperty({
    example: 'username',
    required: true,
  })
  username: string;
  @ApiProperty({
    example: 'photo',
    required: false,
  })
  photo?: string;
}
