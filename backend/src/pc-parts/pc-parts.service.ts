import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePcPartDto } from './dto/create-pc-part.dto';
import { UpdatePcPartDto } from './dto/update-pc-part.dto';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PcPartsService {
  constructor(private prisma: PrismaService) {}

  async create(createPcPartDto: CreatePcPartDto) {
    try {
      return await this.prisma.pcPart.create({ data: createPcPartDto });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('SKU already exists');
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.pcPart.findMany();
  }

  async findOne(id: number) {
    const pc = await this.prisma.pcPart.findUnique({ where: { id } });
    if (!pc) {
      throw new NotFoundException(`PC part ${id} not found`);
    }

    return pc;
  }

  async update(id: number, updatePcPartDto: UpdatePcPartDto) {
    try {
      return await this.prisma.pcPart.update({
        where: { id: id },
        data: updatePcPartDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`PC part ${id} not found`);
        }
        if (error.code === 'P2002') {
          throw new ConflictException('SKU already exists');
        }
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.pcPart.delete({ where: { id: id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`PC part ${id} not found`);
      }
      throw error;
    }
  }
}
