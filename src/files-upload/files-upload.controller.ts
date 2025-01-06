import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateParseFilePipe } from 'src/shared/files/files-validation-factory';
type File = Express.Multer.File;

@Controller('files-upload')
export class FilesUploadController {
  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(CreateParseFilePipe(1024 * 1024 * 6, /^application\/pdf$/))
    file: File,
  ) {
    return file.originalname;
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files', 3))
  uploadMultipleFiles(
    @UploadedFiles(CreateParseFilePipe(1024 * 1024 * 6, /^image\/(pdf)$/))
    files: File[],
  ) {
    return files.map((file) => file.originalname);
  }
}
