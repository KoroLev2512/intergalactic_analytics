import type { Dispatch, SetStateAction } from 'react';

export type File = {
  name: string;
  date: string;
  processed: boolean;
};

export type FilesContextType = {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
};
