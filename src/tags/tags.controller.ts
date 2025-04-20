import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Patch,
    Delete,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { TagsService } from './tags.service';
  import { CreateTagDto, UpdateTagDto } from './dto/tag.dto';
  import { Tag } from './tag/tag.interface';
  
  @Controller('tags')
  export class TagsController {
    constructor(private readonly tagsService: TagsService) {}
  
    @Get()
    getAll(): Tag[] {
      return this.tagsService.getAll();
    }
  
    @Get(':id')
    find(@Param('id') id: string): Tag {
      return this.tagsService.getId(id);
    }
  
    @Get('slug/:slug')
    getBySlug(@Param('slug') slug: string): Tag {
      return this.tagsService.findBySlug(slug);
    }
  
    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    post(@Body() body: CreateTagDto): Promise<Tag> {
      return this.tagsService.insert(body);
    }
  
    @Put(':id')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    update(@Param('id') id: string, @Body() body: CreateTagDto): Tag {
      return this.tagsService.update(id, body);
    }
  
    @Patch(':id')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    patch(@Param('id') id: string, @Body() body: UpdateTagDto): Tag {
      return this.tagsService.patch(id, body);
    }
  
    @Delete(':id')
    delete(@Param('id') id: string): void {
      return this.tagsService.remove(id);
    }
  }
  