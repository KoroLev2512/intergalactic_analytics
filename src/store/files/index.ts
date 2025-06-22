import { FileService, type StoredFile } from '../../services/file';

export type FilesStore = {
  files: StoredFile[];
  addFile: (file: StoredFile) => void;
  setFiles: (files: StoredFile[]) => void;
};

export const createFilesStore = (set: (state: FilesStore) => void): FilesStore => {
  const store = {
    files: FileService.getFiles(),
    addFile: (file: StoredFile) => {
      const updatedFiles = [...FileService.getFiles(), file];
      FileService.setFiles(updatedFiles);
      set({ ...store, files: updatedFiles });
    },
    setFiles: (files: StoredFile[]) => {
      FileService.setFiles(files);
      set({ ...store, files });
    },
  };
  return store;
};
