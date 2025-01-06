import {
  FileTypeValidator,
  FileValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import { FileSignatureValidator } from './validators/file-signature.validator';

const createFileValidator = (
  maxSize: number,
  fileType: RegExp | string,
): FileValidator[] => [
  //validate file size
  new MaxFileSizeValidator({
    maxSize: maxSize,
    message: (maxSize) =>
      `File is too large, max file size is ${maxSize} bytes`,
  }),
  //validate file type
  new FileTypeValidator({
    fileType: fileType,
  }),
  //validate file signature
  new FileSignatureValidator(),
];

export const CreateParseFilePipe = (
  maxSize: number,
  fileType: RegExp,
): ParseFilePipe =>
  new ParseFilePipe({
    validators: createFileValidator(maxSize, fileType),
    errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    fileIsRequired: true,
  });
