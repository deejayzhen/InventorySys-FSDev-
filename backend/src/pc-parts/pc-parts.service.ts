import { Injectable } from '@nestjs/common';
import { CreatePcPartDto } from './dto/create-pc-part.dto';
import { UpdatePcPartDto } from './dto/update-pc-part.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PcPartsService {
  constructor(private prisma: PrismaService) {}

  create(createPcPartDto: CreatePcPartDto) {
    return this.prisma.pcPart.create({ data: createPcPartDto });
  }

  findAll() {
    return this.prisma.pcPart.findMany();
  }

  findOne(id: number) {
    return this.prisma.pcPart.findUnique({ where: { id: id } });
  }

  update(id: number, updatePcPartDto: UpdatePcPartDto) {
    return this.prisma.pcPart.update({
      where: { id: id },
      data: updatePcPartDto,
    });
  }

  remove(id: number) {
    return this.prisma.pcPart.findUnique({ where: { id: id } });
  }
}
