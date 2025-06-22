const STORAGE_KEY = 'files';

export type StoredFile = {
  name: string;
  date: string;
  processed: boolean;
  total_spend_galactic?: number;
  rows_affected?: number;
  less_spent_at?: number;
  big_spent_civ?: string;
  less_spent_civ?: string;
  big_spent_at?: number;
  big_spent_value?: number;
  average_spend_galactic?: number;
};

export const FileService = {
  getFiles(): StoredFile[] {
    const files = localStorage.getItem(STORAGE_KEY);
    return files
      ? JSON.parse(files).map((file: StoredFile) => ({
          ...file,
          date: file.date,
        }))
      : [];
  },

  setFiles(files: StoredFile[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
    return files;
  },

  addFile(file: StoredFile) {
    const current = FileService.getFiles();
    const updated = [...current, file];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  clearFiles(): void {
    localStorage.removeItem(STORAGE_KEY);
  },
};
