import React, { useState } from 'react';
import { DiffEditor } from '@monaco-editor/react';
import '../styles/Components.css';

const MonacoEditorSection = ({ file1Content, file2Content, selectedFile1, selectedFile2, theme }) => {
  const [fontSize, setFontSize] = useState(12);

  if (!file1Content || !file2Content) {
    return (
      <div className="monaco-section">
        <div className="section-header">
          <h2>Monaco Diff Editor</h2>
          <p className="placeholder">Select two files and click "Compare" to view differences</p>
        </div>
      </div>
    );
  }

  // Check if files are identical
  const filesAreIdentical = file1Content === file2Content;

  return (
    <div className="monaco-section">
      <div className="section-header">
        <h2>Monaco Diff Editor</h2>
        <div className="header-controls">
          <label>
            Font Size:
            <input
              type="range"
              min="8"
              max="20"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="font-size-slider"
            />
            {fontSize}px
          </label>
          {filesAreIdentical && (
            <span className="diff-status identical">✓ Files are identical</span>
          )}
          {!filesAreIdentical && (
            <span className="diff-status">⚠ Differences found</span>
          )}
        </div>
      </div>
      <div className="monaco-container">
        {filesAreIdentical ? (
          <div className="identical-files-message">
            <h3>No Differences Found</h3>
            <p>{selectedFile1} and {selectedFile2} have identical content</p>
          </div>
        ) : (
          <DiffEditor
            key={`diffedit-${theme}-${fontSize}`}
            height="100%"
            language="html"
            original={file1Content}
            modified={file2Content}
            theme={theme === 'dark' ? 'vs-dark' : 'vs'}
            options={{
              readOnly: true,
              renderSideBySide: true,
              automaticLayout: true,
              minimap: { enabled: false },
              fontSize: fontSize,
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              originalEditable: false,
              ignoreTrimWhitespace: false,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MonacoEditorSection;
