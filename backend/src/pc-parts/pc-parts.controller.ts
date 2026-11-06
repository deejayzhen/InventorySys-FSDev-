import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PcPartsService } from './pc-parts.service';
import { CreatePcPartDto } from './dto/create-pc-part.dto';
import { UpdatePcPartDto } from './dto/update-pc-part.dto';

@Controller('pc-parts')
export class PcPartsController {
  constructor(private readonly pcPartsService: PcPartsService) {}

  @Post()
  create(@Body() createPcPartDto: CreatePcPartDto) {
    return this.pcPartsService.create(createPcPartDto);
  }

  @Get()
  findAll() {
    return this.pcPartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pcPartsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePcPartDto: UpdatePcPartDto) {
    return this.pcPartsService.update(+id, updatePcPartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pcPartsService.remove(+id);
  }
}
