import { FileValidator } from '@nestjs/common/pipes/file/file-validator.interface';
import magicBytes from 'magic-bytes.js';

export class FileSignatureValidator extends FileValidator {
  constructor() {
    super({});
  }
  isValid(file: any): boolean {
    const fileSignature = magicBytes(file.buffer).map((file) => file.mime);
    const isMatch = fileSignature.includes(file.mimetype);
    if (!fileSignature.length || !isMatch) {
      return false;
    }
    return true;
  }
  buildErrorMessage(): string {
    return `validation faild (file type does not match file signature)`;
  }
}
