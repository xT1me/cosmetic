import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { storage } from './storage.config';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.saveFileMetadata(file);
  }

  @Get('*')
  async getFile(@Param('0') path: string, @Res() res: Response) {
    const filePath = this.filesService.validateFileExistence(path);
    return res.sendFile(filePath);
  }
}
