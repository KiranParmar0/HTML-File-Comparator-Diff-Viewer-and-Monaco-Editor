# Quick Start Commands

## Installation

```bash
# Navigate to project directory
cd my-app

# Install dependencies
npm install --legacy-peer-deps

# Verify dependencies
npm list react react-diff-viewer @monaco-editor/react
```

## Running the App

```bash
# Start development server (opens http://localhost:3000)
npm start

# Build for production
npm build

# Run tests
npm test
```

## Project Structure

```
my-app/
├── public/assets/           # HTML files to compare
│   ├── file1.html
│   ├── file2.html
│   └── file3.html
├── src/
│   ├── components/          # React components
│   │   ├── FileSelector.js
│   │   ├── DiffViewerSection.js
│   │   └── MonacoEditorSection.js
│   ├── styles/
│   │   └── Components.css   # Component styling
│   ├── App.js              # Main app component
│   ├── App.css             # App styling
│   ├── index.js
│   ├── index.css           # Global styling
│   └── setupTests.js
├── package.json
└── SETUP_GUIDE.md          # Detailed setup guide
```

## Features Overview

### 1. File Selector (Top)
- Select File 1 and File 2 from dropdowns
- Click "Compare" button to load files
- Shows loading state and error messages
- Prevents comparing same file twice

### 2. Diff Viewer (Middle)
- Shows differences side-by-side
- Toggle between Split/Inline view
- Line highlighting for changes
- Syntax highlighting for HTML

### 3. Monaco Editor (Bottom)
- Two editors side-by-side
- HTML syntax highlighting
- Adjustable font size (8-20px)
- Read-only mode for safety
- Theme support (light/dark)

### 4. Theme Toggle
- Button in bottom-right corner
- Sun/Moon icon
- Switches Monaco Editor theme

## Supported HTML Files

Place HTML files in `public/assets/` folder:
- file1.html ✓ (included)
- file2.html ✓ (included)
- file3.html ✓ (included)
- Add your own files here!

## How to Use

1. **Start the app**: `npm start`
2. **Select files**: Choose File 1 and File 2 from dropdowns
3. **Compare**: Click "Compare" button
4. **View differences**: Check the diff viewer (middle section)
5. **Review code**: Check the editors (bottom section)
6. **Toggle view**: Use "Split View" / "Inline View" button
7. **Adjust theme**: Click sun/moon button in corner

## Key Components Code

### FileSelector.js
- Dropdown selection for files
- Compare button with validation
- Loading state management

### DiffViewerSection.js
- Uses react-diff-viewer library
- Split/inline view toggle
- File name display

### MonacoEditorSection.js
- Uses @monaco-editor/react
- Font size slider (8-20px)
- Theme support (light/dark)
- Side-by-side editors

### App.js
- Main state management
- File loading logic
- Theme toggle
- Error handling
- Component orchestration

## Styling System

**Colors Used:**
- Primary: #667eea (Purple)
- Secondary: #764ba2 (Dark Purple)
- Background: #f5f7fa (Light Gray)
- Text: #333 (Dark Gray)
- Error: #f8d7da (Light Red)
- Success: #d4edda (Light Green)

**Responsive Breakpoints:**
- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

## Installation Notes

⚠️ **Important**: Use `--legacy-peer-deps` flag because:
- react-diff-viewer was built for React 16
- Project uses React 19
- Flag allows compatible installation

## Troubleshooting

**Port 3000 in use?**
```bash
npm start -- --port 3001
```

**Dependency errors?**
```bash
npm install --legacy-peer-deps
npm audit fix
```

**Cache issues?**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

## File Locations

| File | Location | Purpose |
|------|----------|---------|
| file1.html | public/assets/ | Sample HTML 1 |
| file2.html | public/assets/ | Sample HTML 2 |
| file3.html | public/assets/ | Sample HTML 3 |
| FileSelector.js | src/components/ | File dropdown component |
| DiffViewerSection.js | src/components/ | Diff viewer display |
| MonacoEditorSection.js | src/components/ | Monaco editor display |
| Components.css | src/styles/ | Component styling |
| App.js | src/ | Main app logic |
| App.css | src/ | App styling |
| index.css | src/ | Global styles |

## Dependencies Explained

- **react** (^19.2.5): UI framework
- **react-dom** (^19.2.5): React DOM rendering
- **react-diff-viewer** (^3.1.1): Diff comparison display
- **monaco-editor** (^0.55.1): Monaco editor package
- **@monaco-editor/react** (^4.6.0): React wrapper for Monaco
- **react-scripts** (5.0.1): Create React App build tools

## Development Workflow

1. Edit component files in `src/`
2. Hot reload automatically updates browser
3. Check console for errors
4. Use DevTools for debugging
5. Build when ready with `npm build`

## Performance Considerations

- Diff viewer height: 400px (adjust in Components.css)
- Monaco editor height: 400px (adjust in Components.css)
- Font size range: 8px - 20px (adjustable in app)
- Responsive layout loads faster on mobile

---

**Ready to compare HTML files? Start with: `npm start`** 🚀
