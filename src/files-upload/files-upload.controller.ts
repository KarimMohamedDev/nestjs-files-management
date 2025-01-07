import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MAXFILECOUNT } from 'src/shared/files/constans/files-count.constants';
import { CreateParseFilePipe } from 'src/shared/files/files-validation-factory';
type File = Express.Multer.File;

@Controller('files-upload')
export class FilesUploadController {
  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(CreateParseFilePipe('2MB', ['pdf']))
    file: File,
  ) {
    return file.originalname;
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files', MAXFILECOUNT.PRODUCT_IMAGES))
  uploadMultipleFiles(
    @UploadedFiles(CreateParseFilePipe('4MB', ['png', 'jpg', 'jpeg', 'none']))
    files: File[],
  ) {
    return files.map((file) => file.originalname);
  }
}
