import { useState } from "react";

export default function ImageUploader({ onFilesSelected }) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const updatedFiles = [...selectedFiles, ...files];
    setSelectedFiles(updatedFiles);
    onFilesSelected(updatedFiles); // Pass the updated files to the parent component
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
    </div>
  );
}
