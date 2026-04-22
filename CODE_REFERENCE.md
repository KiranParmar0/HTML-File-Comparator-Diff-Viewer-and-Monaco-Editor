# HTML File Comparator - Code Reference

## Component Architecture

```
App.js (Main Component)
├── FileSelector.js (Top Section - Controls)
├── DiffViewerSection.js (Middle Section - Diff Display)
└── MonacoEditorSection.js (Bottom Section - Editors)
```

---

## App.js - Main Logic

### State Management
```javascript
const [files, setFiles] = useState([]);           // Available files
const [selectedFile1, setSelectedFile1] = useState('');  // Selected file 1
const [selectedFile2, setSelectedFile2] = useState('');  // Selected file 2
const [file1Content, setFile1Content] = useState('');    // File 1 content
const [file2Content, setFile2Content] = useState('');    // File 2 content
const [isLoading, setIsLoading] = useState(false);       // Loading state
const [error, setError] = useState('');                  // Error message
const [message, setMessage] = useState('');              // Success message
const [theme, setTheme] = useState('light');             // Current theme
```

### Key Functions
```javascript
// Load available files from assets folder
loadAvailableFiles() {
  // Returns ['file1.html', 'file2.html', 'file3.html']
}

// Load file content from public/assets/
loadFileContent(fileName) {
  // Fetches file from public/assets/{fileName}
  // Returns file content as text
}

// Main comparison handler
handleCompare() {
  // Validates selections
  // Loads both files
  // Updates state with content
  // Handles errors
}

// Toggle between light/dark theme
toggleTheme() {
  // Switches theme for Monaco Editor
}
```

### Lifecycle
```javascript
// On component mount:
useEffect(() => {
  loadAvailableFiles();
}, []);

// When files are loaded and selection is ready:
useEffect(() => {
  if (files.length > 0 && selectedFile1 && selectedFile2) {
    handleCompare();
  }
}, [files]);
```

---

## FileSelector.js - Controls Component

### Props
```javascript
{
  files,              // String[] - List of available files
  selectedFile1,      // String - Currently selected file 1
  selectedFile2,      // String - Currently selected file 2
  onFile1Change,      // Function - Callback when file 1 changes
  onFile2Change,      // Function - Callback when file 2 changes
  onCompare,          // Function - Callback when compare clicked
  isLoading           // Boolean - Show loading state
}
```

### Key Features
```javascript
// Dropdown select for file 1
<select
  value={selectedFile1}
  onChange={(e) => onFile1Change(e.target.value)}
  disabled={isLoading}
>
  {files.map(file => (
    <option key={file} value={file}>{file}</option>
  ))}
</select>

// Compare button with validation
<button
  onClick={onCompare}
  disabled={!selectedFile1 || !selectedFile2 || isLoading}
>
  {isLoading ? 'Loading...' : 'Compare'}
</button>
```

### Styling (Components.css)
```css
.control-panel {
  display: flex;
  gap: 15px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.compare-button {
  padding: 8px 24px;
  background-color: white;
  color: #667eea;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
}

.compare-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

---

## DiffViewerSection.js - Diff Display

### Props
```javascript
{
  oldContent,     // String - File 1 content (old version)
  newContent,     // String - File 2 content (new version)
  selectedFile1,  // String - File 1 name for display
  selectedFile2   // String - File 2 name for display
}
```

### State
```javascript
const [splitView, setSplitView] = useState(true);
// true: Split view (side-by-side)
// false: Inline view (differences highlighted inline)
```

### Main Component
```javascript
<DiffViewer
  oldValue={oldContent}
  newValue={newContent}
  splitView={splitView}
  hideLineNumbers={false}
  showDiffOnly={false}
  suppressContentEditableWarning
/>
```

### View Toggle Button
```javascript
<button
  onClick={() => setSplitView(!splitView)}
  className="toggle-button"
>
  {splitView ? 'Inline View' : 'Split View'}
</button>
```

### Styling
```css
.diff-viewer-section {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px;
}

.diff-viewer-container {
  max-height: 400px;
  overflow-y: auto;
  padding: 0;
}
```

---

## MonacoEditorSection.js - Code Editors

### Props
```javascript
{
  file1Content,   // String - File 1 content
  file2Content,   // String - File 2 content
  selectedFile1,  // String - File 1 name
  selectedFile2,  // String - File 2 name
  theme          // String - 'light' or 'dark'
}
```

### State
```javascript
const [fontSize, setFontSize] = useState(12);
// Range: 8px to 20px
```

### Editor Configuration
```javascript
<Editor
  height="100%"
  defaultLanguage="html"
  value={file1Content}
  theme={theme === 'dark' ? 'vs-dark' : 'vs'}
  options={{
    readOnly: true,              // Read-only mode
    minimap: { enabled: false }, // Disable minimap
    fontSize: fontSize,
    scrollBeyondLastLine: false,
    wordWrap: 'on'
  }}
/>
```

### Font Size Slider
```javascript
<input
  type="range"
  min="8"
  max="20"
  value={fontSize}
  onChange={(e) => setFontSize(Number(e.target.value))}
  className="font-size-slider"
/>
```

### Layout
```css
.monaco-container {
  display: grid;
  grid-template-columns: 1fr 1fr;  /* Two columns */
  gap: 1px;
  background-color: #e9ecef;
  height: 400px;
}

/* Responsive: Single column on tablet/mobile */
@media (max-width: 1024px) {
  .monaco-container {
    grid-template-columns: 1fr;
    height: 600px;
  }
}
```

---

## Styling System - CSS Structure

### Global Styles (index.css)
```css
* {
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background: #667eea;
  border-radius: 5px;
}
```

### App Layout (App.css)
```css
.App {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px 20px;
  text-align: center;
  color: white;
}

.app-container {
  flex: 1;
  padding: 30px 20px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  overflow-y: auto;
}

.theme-toggle {
  position: fixed;
  bottom: 30px;
  right: 30px;
  border-radius: 50%;
  background-color: #667eea;
  color: white;
  cursor: pointer;
}
```

### Component Styles (Components.css)
```css
/* Control Panel */
.control-panel { /* ... */ }
.control-group { /* ... */ }
.compare-button { /* ... */ }

/* Section Headers */
.section-header { /* ... */ }
.toggle-button { /* ... */ }

/* Diff Viewer */
.diff-viewer-section { /* ... */ }
.diff-viewer-container { /* ... */ }

/* Monaco Editor */
.monaco-section { /* ... */ }
.monaco-container { /* ... */ }
.monaco-editor-wrapper { /* ... */ }
.editor-label { /* ... */ }

/* Responsive */
@media (max-width: 1024px) { /* ... */ }
@media (max-width: 768px) { /* ... */ }
```

---

## File Loading System

### File Structure
```
public/assets/
├── file1.html     <- Loaded from /assets/file1.html
├── file2.html     <- Loaded from /assets/file2.html
└── file3.html     <- Loaded from /assets/file3.html
```

### Loading Process
```javascript
// 1. User selects file from dropdown
onFile1Change('file1.html')

// 2. User clicks Compare button
handleCompare()

// 3. App fetches file content
loadFileContent('file1.html')
  ├─ Fetch: /assets/file1.html
  ├─ Get response text
  └─ Return content

// 4. Content stored in state
setFile1Content(content)

// 5. Components re-render with new content
<DiffViewerSection oldContent={file1Content} newContent={file2Content} />
<MonacoEditorSection file1Content={file1Content} file2Content={file2Content} />
```

### Error Handling
```javascript
try {
  const content = await fetch(`/assets/${fileName}`).then(r => r.text());
  return content;
} catch (err) {
  setError(`Could not load file: ${fileName}`);
  setFile1Content('');
  setFile2Content('');
}
```

---

## Theme System

### Theme Values
```javascript
// Light theme (default)
'vs' - VS Code light theme

// Dark theme
'vs-dark' - VS Code dark theme
```

### Toggle Implementation
```javascript
const [theme, setTheme] = useState('light');

const toggleTheme = () => {
  setTheme(theme === 'light' ? 'dark' : 'light');
};

// Pass to Monaco
theme={theme === 'dark' ? 'vs-dark' : 'vs'}
```

### Theme Button
```javascript
<button
  className="theme-toggle"
  onClick={toggleTheme}
>
  {theme === 'light' ? '🌙' : '☀️'}
</button>
```

---

## Responsive Breakpoints

```css
/* Desktop: > 1024px */
/* Default styles apply */

/* Tablet: 768px - 1024px */
@media (max-width: 1024px) {
  .control-panel {
    flex-direction: column;
  }
  
  .monaco-container {
    grid-template-columns: 1fr;
    height: 600px;
  }
}

/* Mobile: < 768px */
@media (max-width: 768px) {
  .control-panel {
    flex-direction: column;
  }
  
  .control-group select {
    width: 100%;
  }
  
  .monaco-container {
    height: 500px;
  }
  
  .diff-viewer-container {
    max-height: 300px;
  }
}
```

---

## Performance Optimization

### Memoization (if needed)
```javascript
import { memo } from 'react';

const FileSelector = memo(({ files, ... }) => {
  // Component only re-renders if props change
  return (/* JSX */);
});
```

### useCallback for Functions
```javascript
import { useCallback } from 'react';

const handleCompare = useCallback(() => {
  // Function only recreated if dependencies change
  // Prevents unnecessary re-renders of child components
}, [selectedFile1, selectedFile2]);
```

### useMemo for Expensive Calculations
```javascript
import { useMemo } from 'react';

const processedContent = useMemo(() => {
  // Only recalculated if oldContent or newContent changes
  return processLargeFile(oldContent);
}, [oldContent]);
```

---

## Adding New Features

### Add a Copy Button
```javascript
// In DiffViewerSection.js
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  alert('Copied to clipboard!');
};

<button onClick={() => copyToClipboard(newContent)}>
  Copy File 2
</button>
```

### Add File Upload
```javascript
// In FileSelector.js
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    setFile1Content(e.target.result);
  };
  reader.readAsText(file);
};

<input 
  type="file" 
  accept=".html" 
  onChange={handleFileUpload} 
/>
```

### Add Download Feature
```javascript
const downloadContent = (content, fileName) => {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + 
    encodeURIComponent(content));
  element.setAttribute('download', fileName);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

<button onClick={() => downloadContent(file1Content, 'file1.html')}>
  Download File 1
</button>
```

---

## Common Issues & Solutions

### Issue: Diff not updating
```javascript
// Solution: Ensure dependency array includes content
useEffect(() => {
  // Code that depends on oldContent and newContent
}, [oldContent, newContent]);
```

### Issue: Monaco Editor has scrolling
```javascript
// Solution: Set scrollBeyondLastLine to false
options={{
  scrollBeyondLastLine: false,
  // ... other options
}}
```

### Issue: Theme toggle not affecting editor
```javascript
// Solution: Pass theme as key to force re-render
<Editor
  key={theme}  // Add this
  theme={theme === 'dark' ? 'vs-dark' : 'vs'}
/>
```

### Issue: Memory leak warning
```javascript
// Solution: Use cleanup in useEffect
useEffect(() => {
  const handler = () => { /* code */ };
  window.addEventListener('resize', handler);
  
  return () => {
    window.removeEventListener('resize', handler);  // Cleanup
  };
}, []);
```

---

## File References

| File | Purpose |
|------|---------|
| `src/App.js` | Main app logic and state |
| `src/components/FileSelector.js` | File selection controls |
| `src/components/DiffViewerSection.js` | Diff display |
| `src/components/MonacoEditorSection.js` | Code editors |
| `src/styles/Components.css` | Component styling |
| `src/App.css` | App layout and theme |
| `src/index.css` | Global styles |
| `public/assets/file1.html` | Sample file 1 |
| `public/assets/file2.html` | Sample file 2 |
| `public/assets/file3.html` | Sample file 3 |
| `package.json` | Dependencies list |

---

**Happy Coding! 🚀**
