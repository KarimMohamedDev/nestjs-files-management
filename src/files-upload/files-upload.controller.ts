import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
type File = Express.Multer.File;

@Controller('files-upload')
export class FilesUploadController {
  @Post('single')
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 2 * 1024 * 1024 } }),
  ) // 2MB limit
  uploadFile(@UploadedFile() file: File) {
    return file;
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files', 3))
  uploadMultipleFiles(@UploadedFiles() files: File[]) {
    return files.map((file) => file.originalname);
  }
}
