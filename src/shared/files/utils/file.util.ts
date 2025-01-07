import { FileType } from '../types/file.types';

// convert ['jpg', 'jpeg', 'png', 'pdf'] to /jpg|jpeg|png|pdf/
export const createFileTypeRegex = (fileType: FileType[]): RegExp => {
  return new RegExp(fileType.join('|'));
};
