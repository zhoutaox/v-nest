import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    required: true,
  })
  username: string;
  password: string;

  @ApiProperty({
    required: true,
    enum: ['admin', 'user'],
    description: '等级',
  })
  level: string;
}
