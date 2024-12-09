import { Injectable, NotFoundException } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  saveFileMetadata(file: Express.Multer.File) {
    return {
      message: 'File uploaded successfully',
      originalName: file.originalname,
      filePath: file.path,
      size: file.size,
    };
  }

  validateFileExistence(filePath: string) {
    const fullPath = join(process.cwd(), 'uploads', filePath);
    if (!existsSync(fullPath)) {
      throw new NotFoundException('File not found');
    }
    return fullPath;
  }
}
