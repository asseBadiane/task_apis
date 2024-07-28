import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRequestDto {
  @ApiProperty({
    example: 'nom',
    required: false,
  })
  nom?: string;
  @ApiProperty({
    example: 'prenom',
    required: false,
  })
  prenom?: string;
  @ApiProperty({
    example: 'email',
    required: false,
  })
  email?: string;
  @ApiProperty({
    example: 'password',
    required: false,
  })
  password?: string;
  @ApiProperty({
    example: 'photo',
    required: false,
  })
  photo?: string;
}
