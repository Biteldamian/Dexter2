import React, { useState, useEffect } from 'react';
import { FolderOpen, File, Plus, Search } from 'lucide-react';

const FileManager = () => {
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(`/api/files/search?query=${encodeURIComponent(query)}`);
      const results = await response.json();
      setFiles(results);
    } catch (error) {
      console.error('Error searching files:', error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const formData = new FormData();
    formData.append('file', files[0]);

    try {
      const response = await fetch('/api/files', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      console.log('File uploaded:', result);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">File Management</h2>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search files..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch(e.target.value);
              }}
            />
          </div>
          <label className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700">
            <Plus className="h-5 w-5 mr-2" />
            <span>Add Files</span>
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {files.map((file: any) => (
          <div
            key={file.id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedFile(file)}
          >
            <div className="flex items-start space-x-3">
              <File className="h-5 w-5 text-gray-400" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">{file.path}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Last modified: {new Date(file.updated_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-auto">
            <h3 className="text-xl font-semibold mb-4">{selectedFile.path}</h3>
            <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
              <code>{selectedFile.content}</code>
            </pre>
            <button
              className="mt-4 px-4 py-2 bg-gray-200 rounded-lg"
              onClick={() => setSelectedFile(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileManager;