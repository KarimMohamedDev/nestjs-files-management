import { FileType } from '../types/file.types';
import { lookup } from 'mime-types';

// convert ['jpg', 'jpeg', 'png', 'pdf'] to /jpg|jpeg|png|pdf/
export const createFileTypeRegex = (fileType: FileType[]): RegExp => {
  // lookup('jpg') => 'image/jpeg'
  //input => ['jpg', 'jpeg', 'pngg', 'pdf']
  //output => ['image/jpeg', 'image/jpeg', false, 'application/pdf']
  const mediaTypes = fileType
    .map((type) => lookup(type))
    .filter((type) => type !== false);
  return new RegExp(mediaTypes.join('|'));
};
