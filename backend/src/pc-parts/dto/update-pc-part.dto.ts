import { PartialType } from '@nestjs/mapped-types';
import { CreatePcPartDto } from './create-pc-part.dto';

export class UpdatePcPartDto extends PartialType(CreatePcPartDto) {}
