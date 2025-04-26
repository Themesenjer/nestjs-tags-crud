import {
    Injectable,
    NotFoundException,
    BadRequestException,
  } from '@nestjs/common';
  import { v4 as uuidv4 } from 'uuid';
  import { Tag } from './tag/tag.interface';
  import { CreateTagDto, UpdateTagDto } from './dto/tag.dto';
  
  @Injectable()
  export class TagsService {
    private tags: Tag[] = [];
  
    getAll(): Tag[] {
      return this.tags;
    }
  
    getId(id: string): Tag {
      const tag = this.tags.find((tag) => tag.id === id);
      if (!tag) {
        throw new NotFoundException(`Tag con id ${id} no encontrado`);
      }
      return tag;
    }
  
    findBySlug(slug: string): Tag {
      const tag = this.tags.find((t) => t.slug === slug);  //Busca dinamica x slug
      if (!tag) throw new NotFoundException(`Slug '${slug}' no encontrado`);
      return tag;
    }
  
    async insert(dto: CreateTagDto): Promise<Tag> {
      if (this.tags.find((tag) => tag.slug === dto.slug)) {
        throw new BadRequestException(`El slug '${dto.slug}' ya existe`);
      }
  
      const tag: Tag = {
        id: uuidv4(),     // Aquí se genera el UUID automáticamente
        ...dto,
      };
      this.tags.push(tag);
      return tag;
    }
  
    update(id: string, dto: CreateTagDto): Tag {
      const index = this.tags.findIndex((t) => t.id === id);
      if (index === -1)
        throw new NotFoundException(`No existe el tag con id ${id}`);
      const updated = { id, ...dto };
      this.tags[index] = updated;
      return updated;
    }
  
    patch(id: string, dto: UpdateTagDto): Tag {
      const tag = this.getId(id);
      const index = this.tags.findIndex((t) => t.id === id);
      const updated = { ...tag, ...dto };
      this.tags[index] = updated;
      return updated;
    }
  
    remove(id: string): void {
      const index = this.tags.findIndex((t) => t.id === id);
      if (index === -1)
        throw new NotFoundException(`No existe el tag con id ${id}`);
      this.tags.splice(index, 1);
    }
  }
  