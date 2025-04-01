import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsBoolean, IsDate, IsString } from 'class-validator';

export class GetListOpportunityDto {
  @ApiProperty()
  @IsBase64()
  id: number;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsBoolean()
  is_followed: boolean;

  @ApiProperty()
  @IsDate()
  publish_date: Date;

  @ApiProperty()
  @IsDate()
  close_date: Date;
}
