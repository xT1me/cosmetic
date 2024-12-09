import React from 'react';
import { useDropzone } from 'react-dropzone';
import "./FileUploader.css"

const FileUpload = ({ uploadFiles }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: '.jpg, .jpeg, .png, .gif, .pdf',
    onDrop: (acceptedFiles) => handleFileUpload(acceptedFiles),
  });

  const handleFileUpload = (files) => {
    uploadFiles(files);
  };

  return (
    <div className="file-upload-container">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Перетащите файлы сюда или выберите с помощью кнопки.</p>
      </div>
    </div>
  );
};

export default FileUpload;
