"use client";
import React, { useRef } from "react";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <label htmlFor="file-upload" className="relative cursor-pointer">
        <span className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Upload a JSON File
        </span>
        <input
          id="file-upload"
          ref={fileInputRef}
          type="file"
          className="sr-only"
          accept=".json,.txt"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default FileUpload;
