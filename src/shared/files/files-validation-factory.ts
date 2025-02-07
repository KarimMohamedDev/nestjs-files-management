import {
  FileTypeValidator,
  FileValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import * as bytes from 'bytes';
import { FileSignatureValidator } from './validators/file-signature.validator';
import { FileSizeType, FileType } from './types/file.types';
import { createFileTypeRegex } from './utils/file.util';
import { nonEmptyArray } from '../utils/array.utils';

const createFileValidator = (
  maxSize: FileSizeType,
  fileTypes: nonEmptyArray<FileType>,
): FileValidator[] => {
  const fileTypeRegex = createFileTypeRegex(fileTypes);
  return [
    //validate file size
    new MaxFileSizeValidator({
      maxSize: bytes(maxSize),
      message: (maxSize) =>
        `File is too large, max file size is ${maxSize} bytes`,
    }),
    //validate file type
    new FileTypeValidator({
      fileType: fileTypeRegex,
    }),
    //validate file signature
    new FileSignatureValidator(),
  ];
};

export const CreateParseFilePipe = (
  maxSize: FileSizeType,
  fileTypes: nonEmptyArray<FileType>,
): ParseFilePipe =>
  new ParseFilePipe({
    validators: createFileValidator(maxSize, fileTypes),
    errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    fileIsRequired: true,
  });
