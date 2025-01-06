import {
  Controller,
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileSignatureValidator } from '../shared/files/validators/file-signature.validator';
type File = Express.Multer.File;

@Controller('files-upload')
export class FilesUploadController {
  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 6,
            message: (maxSize) =>
              `File is too large, max file size is ${maxSize} bytes`,
          }),
          new FileTypeValidator({
            fileType: /^application\/pdf$/,
          }),
          new FileSignatureValidator(),
        ],
        errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
        fileIsRequired: true,
      }),
    )
    file: File,
  ) {
    return file.originalname;
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files', 3))
  uploadMultipleFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 6,
            message: (maxSize) =>
              `File is too large, max file size is ${maxSize} bytes`,
          }),
          new FileTypeValidator({
            fileType: /^image\/(pdf)$/,
          }),
        ],
        errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
        fileIsRequired: true,
      }),
    )
    files: File[],
  ) {
    return files.map((file) => file.originalname);
  }
}
