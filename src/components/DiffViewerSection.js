import React, { useState } from 'react';
import DiffViewer from 'react-diff-viewer';
import '../styles/Components.css';

const DiffViewerSection = ({ oldContent, newContent, selectedFile1, selectedFile2 }) => {
  const [splitView, setSplitView] = useState(true);

  if (!oldContent || !newContent) {
    return (
      <div className="diff-viewer-section">
        <div className="section-header">
          <h2>Diff Viewer</h2>
          <p className="placeholder">Select two files and click "Compare" to view differences</p>
        </div>
      </div>
    );
  }

  return (
    <div className="diff-viewer-section">
      <div className="section-header">
        <h2>Diff Viewer</h2>
        <div className="header-controls">
          <span className="file-info">
            {selectedFile1} vs {selectedFile2}
          </span>
          <button
            className="toggle-button"
            onClick={() => setSplitView(!splitView)}
          >
            {splitView ? 'Inline View' : 'Split View'}
          </button>
        </div>
      </div>
      <div className="diff-viewer-container">
        <DiffViewer
          oldValue={oldContent}
          newValue={newContent}
          splitView={splitView}
          hideLineNumbers={false}
          showDiffOnly={false}
          suppressContentEditableWarning
        />
      </div>
    </div>
  );
};

export default DiffViewerSection;
