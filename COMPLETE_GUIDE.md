# HTML File Comparator - Complete Setup & Usage Guide

## 🎉 Project Successfully Created!

Your React HTML File Comparator is now fully functional and running at **http://localhost:3000**

---

## 📁 Project Structure

```
my-app/
├── public/
│   └── assets/
│       ├── file1.html          ✓ Sample file 1
│       ├── file2.html          ✓ Sample file 2
│       └── file3.html          ✓ Sample file 3
├── src/
│   ├── components/
│   │   ├── FileSelector.js     - File selection dropdowns + Compare button
│   │   ├── DiffViewerSection.js - Diff comparison display
│   │   └── MonacoEditorSection.js - Side-by-side code editors
│   ├── styles/
│   │   └── Components.css      - All component styling
│   ├── App.js                  - Main app logic & state
│   ├── App.css                 - App layout & theme
│   ├── index.js                - Entry point
│   ├── index.css               - Global styles
│   └── setupTests.js
├── package.json
├── QUICK_START.md              - Quick reference guide
├── SETUP_GUIDE.md              - Detailed setup documentation
└── COMPLETE_GUIDE.md           - This file
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v14+ installed
- npm or yarn

### Installation & Running

```bash
# 1. Navigate to project
cd my-app

# 2. Install dependencies (IMPORTANT: use --legacy-peer-deps)
npm install --legacy-peer-deps

# 3. Start development server
npm start

# App opens automatically at http://localhost:3000
```

### Why --legacy-peer-deps?
- react-diff-viewer was built for React 16
- Project uses React 19
- Flag allows compatible installation without errors

---

## 🎨 Application Features

### 1. **Control Panel (Sticky Header)**
Located at the top of the application:
- **File 1 Dropdown**: Select first HTML file
- **File 2 Dropdown**: Select second HTML file
- **Compare Button**: Load and compare selected files
- Shows loading state while fetching
- Prevents invalid selections (same file twice, empty selections)
- Gradient purple background with white text

### 2. **Diff Viewer Section (Middle)**
Shows the differences between two files:
- Uses `react-diff-viewer` library
- **Split View**: Side-by-side comparison (default)
- **Inline View**: Differences highlighted inline
- Toggle button to switch between views
- Shows file names for reference
- Line numbers for easy navigation
- Color-coded: 
  - 🔴 Red = Removed lines
  - 🟢 Green = Added lines
  - ⚪ Gray = Unchanged lines

### 3. **Monaco Editor Section (Bottom)**
Displays full content of both files:
- Uses `@monaco-editor/react`
- **Two side-by-side editors** for easy comparison
- HTML syntax highlighting
- Font size adjustment (8px - 20px)
- Read-only mode for safety
- Theme support:
  - Light theme (default)
  - Dark theme (click sun/moon button)
- Line numbers and code folding
- Word wrap enabled for long lines

### 4. **Theme Toggle**
Floating button in bottom-right corner:
- ☀️ Sun icon: Switch to dark theme
- 🌙 Moon icon: Switch to light theme
- Affects Monaco Editor appearance
- Smooth transition between themes

---

## 💾 Included Sample Files

Three HTML files are included in `/public/assets/`:

1. **file1.html** - Basic HTML page
   - Simple styling
   - Basic button element
   - Standard structure

2. **file2.html** - Enhanced version
   - Improved styling with shadows
   - Additional content paragraphs
   - Better typography
   - Enhanced button with hover effect

3. **file3.html** - Modern design
   - Gradient background
   - Advanced CSS styling
   - Feature list with checkmarks
   - Modern responsive design

---

## 🎯 How to Use the Application

### Step 1: Select Files
```
1. Click "File 1" dropdown
2. Select a file (e.g., "file1.html")
3. Click "File 2" dropdown
4. Select different file (e.g., "file2.html")
5. Click "Compare" button
```

### Step 2: View Differences
```
- Middle section shows diff with highlights
- Click "Split View" / "Inline View" to toggle
- Scroll to see all differences
- Line numbers help navigate
```

### Step 3: Review Code
```
- Bottom section shows both files
- Use font size slider to adjust text size
- Both editors are read-only
- Syntax highlighting active
```

### Step 4: Adjust Theme (Optional)
```
- Click sun/moon button (bottom-right)
- Monaco Editor theme changes
- Content remains the same
```

---

## 🛠️ Adding Custom HTML Files

To add more files for comparison:

1. **Create your HTML file** with any name
2. **Place it in** `public/assets/` folder
3. **Restart the app** or just select it from dropdown
4. **No code changes needed!** File appears automatically

Example:
```
public/assets/
├── file1.html
├── file2.html
├── file3.html
└── mycustomfile.html  ← New file appears in dropdown
```

---

## ⚙️ Configuration & Customization

### Change Default Files
Edit `src/App.js` line 27-28:
```javascript
setSelectedFile1('file1.html');  // Change this
setSelectedFile2('file2.html');  // Change this
```

### Adjust Section Heights
Edit `src/styles/Components.css`:
```css
.diff-viewer-container {
  max-height: 400px;  /* Change this for diff viewer */
}

.monaco-container {
  height: 400px;  /* Change this for editors */
}
```

### Customize Colors
Edit gradient in `src/App.css` and `src/styles/Components.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
/* Change these color codes to your preference */
```

### Font Size Range
Edit `src/components/MonacoEditorSection.js`:
```javascript
<input
  type="range"
  min="8"      {/* Change minimum size */}
  max="20"     {/* Change maximum size */}
/>
```

---

## 📱 Responsive Design

The application is fully responsive:

| Screen Size | Behavior |
|-------------|----------|
| **Desktop** (>1024px) | All sections side-by-side where possible |
| **Tablet** (768-1024px) | Single column layout, stacked sections |
| **Mobile** (<768px) | Full-width sections, optimized controls |

### Mobile Optimization
- Controls stack vertically
- Editors stack instead of side-by-side
- Touch-friendly buttons and dropdowns
- Scrollable sections for readability

---

## 🎨 Styling System

### Color Palette
```css
Primary:     #667eea (Purple)
Secondary:   #764ba2 (Dark Purple)
Background:  #f5f7fa (Light Gray)
Text:        #333 (Dark Gray)
Success:     #d4edda (Light Green)
Error:       #f8d7da (Light Red)
```

### Layout System
- **CSS Grid**: Main layout structure
- **Flexbox**: Component arrangement
- **Responsive Units**: em, rem, %, vh/vw
- **Media Queries**: Breakpoints for responsive design

### Animations
- Smooth transitions (0.3s)
- Hover effects on buttons
- Transform effects on interactions
- Custom scrollbar styling

---

## 🔧 Available Commands

```bash
# Development
npm start              # Start dev server (localhost:3000)
npm test              # Run test suite
npm run build         # Build for production
npm eject             # Eject from Create React App (irreversible!)

# Maintenance
npm install           # Install dependencies
npm update            # Update packages
npm audit             # Check for vulnerabilities
npm audit fix         # Fix security issues
```

---

## 📦 Dependencies

```json
{
  "react": "^19.2.5",                    // UI framework
  "react-dom": "^19.2.5",                // DOM rendering
  "react-diff-viewer": "^3.1.1",         // Diff display
  "monaco-editor": "^0.55.1",            // Monaco package
  "@monaco-editor/react": "^4.6.0",      // React wrapper
  "react-scripts": "5.0.1"               // Build tools
}
```

---

## 🐛 Troubleshooting

### Issue: Port 3000 already in use
```bash
npm start -- --port 3001
```

### Issue: Dependency conflicts
```bash
npm install --legacy-peer-deps
npm cache clean --force
```

### Issue: Files not loading
- Check files are in `public/assets/`
- Use lowercase file extensions
- Restart dev server: Stop (Ctrl+C) and `npm start`

### Issue: Monaco Editor not showing
- Verify `@monaco-editor/react` installed: `npm list @monaco-editor/react`
- Check browser console for errors (F12)
- Ensure editor height is sufficient in CSS

### Issue: Diff viewer not updating
- Click "Compare" button again
- Clear browser cache (Ctrl+Shift+Delete)
- Refresh page (Ctrl+R)

### Issue: Theme toggle not working
- Check Monaco Editor is loaded
- Verify theme values in `MonacoEditorSection.js`
- Check browser console for errors

---

## 📊 Performance Tips

### Large Files (>100KB)
- Increase diff-viewer height
- Reduce Monaco font size
- Consider splitting comparison

### Slow Performance
- Check browser tab has focus
- Disable extensions that modify DOM
- Use incognito mode for testing
- Check system resources

### Optimization
- Production build: `npm run build`
- Minification reduces bundle size ~40%
- Gzip compression for network transfer
- Lazy load components if needed

---

## 🧪 Testing the App

### Manual Testing Checklist
- [ ] Select file1.html and file2.html
- [ ] Click Compare button
- [ ] Verify diff viewer shows changes
- [ ] Verify Monaco editors show both files
- [ ] Click "Split View" / "Inline View" button
- [ ] Adjust font size slider
- [ ] Click theme toggle button
- [ ] Test on mobile view (DevTools)
- [ ] Try selecting same file twice (should error)
- [ ] Try comparing different file combinations

---

## 📚 Component Documentation

### FileSelector.js
```javascript
Props:
  files: Array - Available HTML files
  selectedFile1: String - Selected file 1
  selectedFile2: String - Selected file 2
  onFile1Change: Function - Handle file 1 change
  onFile2Change: Function - Handle file 2 change
  onCompare: Function - Handle compare action
  isLoading: Boolean - Show loading state
```

### DiffViewerSection.js
```javascript
Props:
  oldContent: String - File 1 content
  newContent: String - File 2 content
  selectedFile1: String - File 1 name
  selectedFile2: String - File 2 name
```

### MonacoEditorSection.js
```javascript
Props:
  file1Content: String - File 1 content
  file2Content: String - File 2 content
  selectedFile1: String - File 1 name
  selectedFile2: String - File 2 name
  theme: String - 'light' or 'dark'
```

---

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
```

Creates optimized production build in `build/` directory.

### Deploy to Hosting
```bash
# Vercel
vercel

# Netlify
netlify deploy

# GitHub Pages
npm run build
git add build/
git commit -m "Deploy production build"
git push
```

### Environment Variables
Create `.env` file for environment-specific settings:
```env
REACT_APP_API_URL=https://api.example.com
REACT_APP_ENV=production
```

---

## 📖 Additional Resources

### Documentation
- [React Documentation](https://react.dev)
- [react-diff-viewer GitHub](https://github.com/aceakash/react-diff-viewer)
- [Monaco Editor Documentation](https://microsoft.github.io/monaco-editor/)
- [Create React App Docs](https://create-react-app.dev)

### Related Files
- `QUICK_START.md` - Quick reference
- `SETUP_GUIDE.md` - Detailed setup
- `COMPLETE_GUIDE.md` - This guide

---

## ✨ Features Implemented

✅ **Completed Features**
- [x] React 19 with Hooks (useState, useEffect)
- [x] react-diff-viewer integration (split/inline view)
- [x] @monaco-editor/react integration
- [x] File selection from assets folder
- [x] Side-by-side HTML comparison
- [x] Syntax highlighting
- [x] Theme toggle (light/dark)
- [x] Responsive design
- [x] Loading states
- [x] Error handling
- [x] Font size adjustment
- [x] Clean component architecture
- [x] Professional styling

🎁 **Bonus Features**
- [x] Split/Inline view toggle
- [x] Dark/Light theme
- [x] Floating theme button
- [x] Sticky control panel
- [x] Scrollbar styling
- [x] Success/Error messages
- [x] Validation (prevent same file comparison)

🚀 **Future Enhancement Ideas**
- [ ] File upload support
- [ ] Code export/download
- [ ] Search in diff
- [ ] Syntax highlighting options
- [ ] Copy to clipboard
- [ ] PDF report generation
- [ ] Comparison history
- [ ] Multiple file comparison

---

## 📞 Support

If you encounter issues:

1. **Check this guide** - Most common issues covered
2. **Check browser console** - Press F12 for error details
3. **Check terminal output** - Dev server shows compilation errors
4. **Verify file locations** - Files must be in correct folders
5. **Clear cache** - Sometimes old files cause issues

---

## 🎉 You're All Set!

Your HTML File Comparator is ready to use!

### Quick Start
```bash
cd my-app
npm start
```

Then visit **http://localhost:3000** in your browser.

---

**Happy Comparing! 🔍**

For more help, see `QUICK_START.md` and `SETUP_GUIDE.md`
