import React from 'react';
import '../styles/Components.css';

const FileSelector = ({ files, selectedFile1, selectedFile2, onFile1Change, onFile2Change, onCompare, isLoading }) => {
  return (
    <div className="control-panel">
      <div className="control-group">
        <label htmlFor="file1-select">File 1:</label>
        <select
          id="file1-select"
          value={selectedFile1}
          onChange={(e) => onFile1Change(e.target.value)}
          disabled={isLoading}
        >
          <option value="">Select File 1</option>
          {files.map((file) => (
            <option key={file} value={file}>
              {file}
            </option>
          ))}
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="file2-select">File 2:</label>
        <select
          id="file2-select"
          value={selectedFile2}
          onChange={(e) => onFile2Change(e.target.value)}
          disabled={isLoading}
        >
          <option value="">Select File 2</option>
          {files.map((file) => (
            <option key={file} value={file}>
              {file}
            </option>
          ))}
        </select>
      </div>

      <button
        className="compare-button"
        onClick={onCompare}
        disabled={!selectedFile1 || !selectedFile2 || isLoading}
      >
        {isLoading ? 'Loading...' : 'Compare'}
      </button>
    </div>
  );
};

export default FileSelector;
