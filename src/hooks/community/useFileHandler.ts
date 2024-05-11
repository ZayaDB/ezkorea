import { useState } from 'react';

export function useFileHandler(initialFiles: File[] = []) {
  const [files, setFiles] = useState<File[]>(initialFiles);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = [...files, ...Array.from(event.target.files)];
      setFiles(newFiles);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  return { files, handleFileChange, handleRemoveFile, setFiles };
}
