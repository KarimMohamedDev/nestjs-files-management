import {
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import { FileSignatureValidator } from './validators/file-signature.validator';

export const CreateParseFilePipe = (
  maxSize: number,
  fileType: RegExp,
): ParseFilePipe =>
  new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({
        maxSize: maxSize,
        message: (maxSize) =>
          `File is too large, max file size is ${maxSize} bytes`,
      }),
      new FileTypeValidator({
        fileType: fileType,
      }),
      new FileSignatureValidator(),
    ],
    errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    fileIsRequired: true,
  });
