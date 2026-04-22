# HTML File Comparator

A modern React application for comparing HTML files using **react-diff-viewer** and **Monaco Editor**.

## Features

✨ **Dual-View Comparison**
- **Top Section**: react-diff-viewer with side-by-side or inline view options
- **Bottom Section**: Monaco Editor showing both files side-by-side

🎨 **Modern UI**
- Clean, responsive dashboard layout
- Sticky control panel header
- Smooth transitions and animations
- Dark/Light theme toggle
- Professional gradient design

⚙️ **Functionality**
- File selection from assets folder
- Real-time file loading and comparison
- Syntax highlighting for HTML
- Adjustable font size in Monaco Editor
- Split view toggle for diff viewer
- Error handling and loading states
- Default files pre-loaded on app start

📱 **Responsive Design**
- Works on desktop, tablet, and mobile
- Flexible grid layout
- Adaptive spacing

## Project Structure

```
my-app/
├── public/
│   ├── assets/
│   │   ├── file1.html
│   │   ├── file2.html
│   │   └── file3.html
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── FileSelector.js
│   │   ├── DiffViewerSection.js
│   │   └── MonacoEditorSection.js
│   ├── styles/
│   │   └── Components.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   └── ...other files
├── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. **Navigate to the project directory:**
   ```bash
   cd my-app
   ```

2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```
   
   > Note: We use `--legacy-peer-deps` because react-diff-viewer was built for React 16, but we're using React 19. This flag allows the installation to proceed.

3. **Verify installation:**
   ```bash
   npm list react react-diff-viewer @monaco-editor/react
   ```

## Running the Application

### Development Mode

Start the development server:

```bash
npm start
```

The app will open at `http://localhost:3000` automatically.

### Build for Production

Create an optimized production build:

```bash
npm build
```

The build files will be in the `build/` directory.

## Usage

1. **Select Files**: Use the dropdown menus to select File 1 and File 2
   - Available files: file1.html, file2.html, file3.html

2. **Click Compare**: Press the "Compare" button to load and compare the files

3. **View Diff**: 
   - The middle section shows differences with syntax highlighting
   - Toggle between "Split View" and "Inline View" for different perspectives

4. **View Editors**:
   - The bottom section shows both files in Monaco Editor side-by-side
   - Adjust font size using the slider
   - Both editors are read-only

5. **Theme Toggle**:
   - Click the sun/moon button in the bottom-right corner to toggle between light and dark themes

## Component Overview

### FileSelector
- Manages file selection dropdowns
- Handles the Compare button action
- Shows loading state during file fetch
- Validates selections

### DiffViewerSection
- Displays differences using react-diff-viewer
- Supports split/inline view toggle
- Shows file comparison with syntax highlighting
- Displays file names for reference

### MonacoEditorSection
- Shows both files side-by-side in Monaco Editor
- Provides font size adjustment
- Read-only mode for safety
- HTML syntax highlighting
- Theme support (light/dark)

## Adding More Files

To add more HTML files for comparison:

1. Add your HTML file to `public/assets/` folder
   ```
   public/assets/yourfile.html
   ```

2. The file will automatically appear in the dropdowns

3. No code changes needed!

## Customization

### Change Default Files

In `App.js`, modify the `loadAvailableFiles()` function:

```javascript
setSelectedFile1('file1.html');  // Change this
setSelectedFile2('file2.html');  // Change this
```

### Adjust Section Heights

In `src/styles/Components.css`, modify:

```css
.diff-viewer-container {
  max-height: 400px;  /* Change this value */
}

.monaco-container {
  height: 400px;  /* Change this value */
}
```

### Customize Colors

Update the gradient colors in `App.css` and `Components.css`:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

## Styling

The application uses:
- **CSS Grid** for layout
- **Flexbox** for component arrangement
- **CSS Variables** for consistent styling
- **Responsive Design** with media queries
- **Custom Scrollbars** with gradient colors

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Troubleshooting

### Port 3000 is already in use

```bash
npm start -- --port 3001
```

### Dependency conflicts

If you encounter peer dependency issues, use:

```bash
npm install --legacy-peer-deps
```

### Files not loading

1. Check that HTML files are in `public/assets/` folder
2. Verify file names match exactly (case-sensitive)
3. Check browser console for error messages
4. Ensure file paths use forward slashes `/`

### Monaco Editor not displaying

- Ensure `@monaco-editor/react` is installed: `npm list @monaco-editor/react`
- Check that the Editor component is properly imported
- Verify network connection for resource loading

## Performance Tips

1. **Large Files**: For very large HTML files, consider:
   - Increasing diff-viewer container height
   - Reducing font size in Monaco
   - Limiting lines shown at once

2. **Responsive**: The layout automatically adjusts on smaller screens
   - Test on mobile using DevTools
   - Adjust breakpoints in CSS if needed

## Dependencies

```json
{
  "react": "^19.2.5",
  "react-dom": "^19.2.5",
  "react-diff-viewer": "^3.1.1",
  "monaco-editor": "^0.55.1",
  "@monaco-editor/react": "^4.6.0"
}
```

## Available Scripts

- `npm start`: Run in development mode
- `npm build`: Build for production
- `npm test`: Run test suite
- `npm eject`: Eject from create-react-app (irreversible)

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Verify all files are in correct locations
4. Ensure all dependencies are installed

## Future Enhancements

Potential features to add:
- File upload support
- Syntax highlighting options
- Copy to clipboard functionality
- Download diff report
- Save comparison history
- Code folding in editor
- Search and replace in diff
- Export as PDF

---

**Created with ❤️ using React, react-diff-viewer, and Monaco Editor**
