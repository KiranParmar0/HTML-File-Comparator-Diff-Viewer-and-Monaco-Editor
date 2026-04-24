# HTML Preview Diff - Quick Start Guide

## How to Use

### Step 1: Select Files
1. Use the dropdown menus at the top to select two HTML files
2. Click **"Compare"** button

### Step 2: View Differences
The page automatically loads and displays:
1. **Diff Viewer** - Code-level differences (line-by-line)
2. **Monaco Diff Editor** - Side-by-side code editing
3. **HTML Preview (NEW)** - Visual comparison with highlighted differences

### Step 3: Understand the Highlights
- 🟢 **Green** = Added content (only in file 2)
- 🔴 **Red** = Removed content (only in file 1, with strikethrough)
- 🟡 **Yellow** = Changed content (different between files)

### Step 4: Use Controls
- **Sync Scroll**: Check to scroll both panels simultaneously
- **Show Only Differences**: Toggle to view only changed content
- Scroll inside each panel to browse the HTML preview

## What Gets Compared?

### ✅ Meaningful Content (Compared)
- Text content visible in the rendered HTML
- Image `<img>` tags and `src` attributes
- Link `<a>` tags and `href` attributes
- HTML structure and nesting
- Heading levels (h1, h2, h3, etc.)

### ❌ Ignored (Not Compared)
- CSS styles and `<style>` blocks
- Inline style attributes
- Class and ID attributes
- Whitespace and formatting
- HTML comments
- Script tags
- Meta tags
- Comments

## Example

### File 1
```html
<h1>Welcome to Page 1</h1>
<p>This is the first version.</p>
<button>Click Me</button>
```

### File 2
```html
<h1>Welcome to Page 2 - Updated</h1>
<p>This is an updated version.</p>
<p>New paragraph added.</p>
<button>Click Me Now</button>
```

### Preview Result
- Heading: "Page 1" ➜ "Page 2 - Updated" (highlighted in yellow = changed)
- First paragraph: "first version" ➜ "updated version" (highlighted in yellow = changed)
- Second paragraph: "New paragraph added" (highlighted in green = added)
- Button: "Click Me" ➜ "Click Me Now" (highlighted in yellow = changed)

## Features

### Visual Preview
- Renders HTML exactly as it would appear in a browser
- Side-by-side comparison for easy spotting of differences
- Maintains readable layout with proper spacing

### Responsive Design
- Desktop: Two-column layout side-by-side
- Tablet: Two-column with adjusted sizing
- Mobile: Stacked vertical layout

### Accessibility
- Clear color-coded legend
- File names displayed above each panel
- Summary statistics showing total changes
- High contrast for visibility

### Performance
- Handles large HTML files smoothly
- Efficient DOM-based comparison (not string-based)
- Optimized rendering with React hooks

## Tips & Tricks

1. **Sync Scroll is Your Friend**: Keep it checked to navigate both files simultaneously
2. **For Large Differences**: Use the legend to focus on specific types of changes
3. **Text Content Only**: Remember that this tool focuses on rendered content, not code structure
4. **Styles Don't Matter**: Different CSS classes/styles are ignored - only visible content is compared
5. **Images Are Tracked**: Different image sources (src) will be highlighted

## Common Scenarios

### Scenario 1: Identical Files
**Result**: Message "No visible content differences" appears
- Files have same meaningful content
- CSS/styling differences are ignored
- Safe to merge or deploy

### Scenario 2: Minor Text Changes
**Result**: Only affected text is highlighted in yellow
- Good for content updates
- Easy to verify what changed
- Perfect for proofreading

### Scenario 3: Content Added/Removed
**Result**: Green (added) or red (removed) highlights show exactly where changes are
- New sections in green
- Removed sections in red with strikethrough
- Clear visual indication of scope

### Scenario 4: Invalid HTML
**Result**: Graceful error message
- No crash or broken UI
- Clear error notification
- Try uploading valid HTML

## Keyboard Navigation

- **Scroll**: Use arrow keys or scroll wheel in any panel
- **Compare Again**: Click Compare to reload with new files
- **Theme Toggle**: Use the moon/sun icon in bottom-right

## Troubleshooting

### Preview shows empty
- **Cause**: HTML body is empty or only contains styles/scripts
- **Solution**: Check if the HTML file has actual content in the body tag

### No differences showing but expect changes
- **Cause**: Differences are only in CSS/classes/IDs
- **Solution**: This tool ignores styling - only visible text content is compared

### Sync scroll not working
- **Cause**: One panel might be fully scrolled
- **Solution**: Check if both panels have scrollable content

### Large file loading slowly
- **Cause**: Parsing very large HTML files
- **Solution**: Be patient - tool is optimized but large files take time

## Advanced Features (Bonus)

### Show Only Differences (When Available)
- Filter view to show only changed content
- Hide unchanged portions for focus
- Only available when differences exist

### Sync Scroll with Custom Speed
- Both panels scroll together
- Maintains vertical alignment
- Helps identify corresponding content

---

**Happy Comparing!** 🔍
