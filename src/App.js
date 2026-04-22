import React, { useState, useEffect } from 'react';
import './App.css';
import FileSelector from './components/FileSelector';
import DiffViewerSection from './components/DiffViewerSection';
import MonacoEditorSection from './components/MonacoEditorSection';

function App() {
  const [files, setFiles] = useState([]);
  const [selectedFile1, setSelectedFile1] = useState('');
  const [selectedFile2, setSelectedFile2] = useState('');
  const [file1Content, setFile1Content] = useState('');
  const [file2Content, setFile2Content] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [theme, setTheme] = useState('light');

  // Load available files on component mount
  useEffect(() => {
    loadAvailableFiles();
  }, []);

  const loadAvailableFiles = async () => {
    try {
      // The files are in public/assets folder
      const availableFiles = ['file1.html', 'file2.html', 'file3.html'];
      setFiles(availableFiles);
      
      // Set default selections
      setSelectedFile1('file1.html');
      setSelectedFile2('file2.html');
    } catch (err) {
      setError('Failed to load available files');
    }
  };

  const loadFileContent = async (fileName) => {
    try {
      const response = await fetch(`/assets/${fileName}`);
      if (!response.ok) throw new Error(`Failed to load ${fileName}`);
      return await response.text();
    } catch (err) {
      throw new Error(`Could not load file: ${fileName}`);
    }
  };

  const handleCompare = async () => {
    setError('');
    setMessage('');

    if (!selectedFile1 || !selectedFile2) {
      setError('Please select both files');
      return;
    }

    if (selectedFile1 === selectedFile2) {
      setError('Please select two different files');
      return;
    }

    setIsLoading(true);

    try {
      const content1 = await loadFileContent(selectedFile1);
      const content2 = await loadFileContent(selectedFile2);

      setFile1Content(content1);
      setFile2Content(content2);
      setMessage('Files loaded successfully!');

      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.message);
      setFile1Content('');
      setFile2Content('');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Load default files once they're available
  useEffect(() => {
    if (files.length > 0 && selectedFile1 && selectedFile2 && !file1Content && !file2Content) {
      handleCompare();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return (
    <div className="App" style={{
      backgroundColor: theme === 'dark' ? '#1e1e1e' : '#f5f7fa',
      color: theme === 'dark' ? '#e0e0e0' : '#333'
    }}>
      {/* Header */}
      <div className="app-header">
        <h1>🔍 HTML File Comparator</h1>
        <p>Compare HTML files with Diff Viewer and Monaco Editor</p>
      </div>

      {/* Main Container */}
      <div className="app-container">
        {/* Messages */}
        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}
        {message && (
          <div className="success-message">
            ✓ {message}
          </div>
        )}

        {/* Control Panel */}
        <div className="section-wrapper">
          <FileSelector
            files={files}
            selectedFile1={selectedFile1}
            selectedFile2={selectedFile2}
            onFile1Change={setSelectedFile1}
            onFile2Change={setSelectedFile2}
            onCompare={handleCompare}
            isLoading={isLoading}
          />
        </div>

        {/* Diff Viewer Section */}
        <div className="section-wrapper">
          <DiffViewerSection
            oldContent={file1Content}
            newContent={file2Content}
            selectedFile1={selectedFile1}
            selectedFile2={selectedFile2}
          />
        </div>

        {/* Monaco Editor Section */}
        <div className="section-wrapper">
          <MonacoEditorSection
            file1Content={file1Content}
            file2Content={file2Content}
            selectedFile1={selectedFile1}
            selectedFile2={selectedFile2}
            theme={theme}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="app-footer">
        <p>Created with React, react-diff-viewer, and Monaco Editor</p>
      </div>

      {/* Theme Toggle Button */}
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  );
}

export default App;
