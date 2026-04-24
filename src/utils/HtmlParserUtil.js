/**
 * HTML Parser Utility - Parses HTML and compares meaningful content differences
 * Ignores: CSS, classes, IDs, whitespace, formatting, comments
 * Compares: Text content, image tags, structural differences
 */

/**
 * Parse HTML string and return DOM document
 */
export const parseHTML = (htmlString) => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    
    // Check for parsing errors
    if (doc.body.innerHTML.includes('parsererror')) {
      throw new Error('Invalid HTML');
    }
    
    return doc;
  } catch (error) {
    console.error('HTML parsing error:', error);
    return null;
  }
};

/**
 * Clean DOM by removing unwanted elements and attributes
 */
const cleanDOM = (element) => {
  const clone = element.cloneNode(true);
  
  // Remove script and style elements
  clone.querySelectorAll('script, style, noscript').forEach(el => el.remove());
  
  // Remove class, id, and style attributes from all elements
  clone.querySelectorAll('*').forEach(el => {
    el.removeAttribute('class');
    el.removeAttribute('id');
    el.removeAttribute('style');
    el.removeAttribute('data-');
    // Remove all data-* attributes
    Array.from(el.attributes).forEach(attr => {
      if (attr.name.startsWith('data-')) {
        el.removeAttribute(attr.name);
      }
    });
  });
  
  return clone;
};

/**
 * Extract meaningful text content from element
 */
const getTextContent = (element) => {
  return element.innerText || element.textContent || '';
};

/**
 * Normalize whitespace for comparison
 */
const normalizeContent = (text) => {
  return text
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Get meaningful content structure for comparison
 */
const getContentStructure = (bodyElement) => {
  const nodes = [];
  
  const traverse = (element) => {
    for (let node of element.childNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node;
        
        // Track meaningful elements
        if (el.tagName === 'IMG') {
          nodes.push({
            type: 'img',
            src: el.getAttribute('src') || '',
            alt: el.getAttribute('alt') || ''
          });
        } else if (el.tagName === 'A') {
          nodes.push({
            type: 'link',
            href: el.getAttribute('href') || '',
            text: normalizeContent(getTextContent(el))
          });
        } else {
          const text = normalizeContent(getTextContent(el));
          if (text) {
            nodes.push({
              type: 'text',
              tag: el.tagName.toLowerCase(),
              text: text
            });
          }
          // Recursively traverse children
          traverse(el);
        }
      } else if (node.nodeType === Node.TEXT_NODE) {
        const text = normalizeContent(node.textContent);
        if (text && text.length > 0) {
          nodes.push({
            type: 'text',
            text: text
          });
        }
      }
    }
  };
  
  traverse(bodyElement);
  return nodes;
};

/**
 * Compare two content structures and return differences
 */
const compareStructures = (structure1, structure2) => {
  const diffs = {
    added: [],
    removed: [],
    changed: []
  };
  
  // Simple comparison: check which nodes are different
  const minLength = Math.min(structure1.length, structure2.length);
  
  for (let i = 0; i < minLength; i++) {
    const node1 = structure1[i];
    const node2 = structure2[i];
    
    if (JSON.stringify(node1) !== JSON.stringify(node2)) {
      diffs.changed.push({ index: i, node1, node2 });
    }
  }
  
  // Detect added nodes
  if (structure2.length > structure1.length) {
    for (let i = minLength; i < structure2.length; i++) {
      diffs.added.push({ index: i, node: structure2[i] });
    }
  }
  
  // Detect removed nodes
  if (structure1.length > structure2.length) {
    for (let i = minLength; i < structure1.length; i++) {
      diffs.removed.push({ index: i, node: structure1[i] });
    }
  }
  
  return diffs;
};

/**
 * Create a copy of DOM tree and highlight differences
 */
const highlightDifferences = (bodyElement, diffs, isFile2) => {
  const clone = bodyElement.cloneNode(true);
  const allElements = clone.querySelectorAll('*');
  
  // Create a set of indices to highlight
  const indicesToHighlight = new Set();
  
  if (isFile2) {
    diffs.added.forEach(diff => indicesToHighlight.add(diff.index));
    diffs.changed.forEach(diff => indicesToHighlight.add(diff.index));
  } else {
    diffs.removed.forEach(diff => indicesToHighlight.add(diff.index));
    diffs.changed.forEach(diff => indicesToHighlight.add(diff.index));
  }
  
  // For simplicity, we'll highlight by finding matching elements
  let nodeIndex = 0;
  const traverse = (element) => {
    for (let node of element.childNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node;
        
        if (el.tagName === 'IMG' || el.tagName === 'A') {
          if (indicesToHighlight.has(nodeIndex)) {
            const span = document.createElement('span');
            span.className = isFile2 ? 
              (diffs.added.some(d => d.index === nodeIndex) ? 'diff-highlight-added' : 'diff-highlight-changed') :
              (diffs.removed.some(d => d.index === nodeIndex) ? 'diff-highlight-removed' : 'diff-highlight-changed');
            el.parentNode.insertBefore(span, el);
            span.appendChild(el.cloneNode(true));
          }
          nodeIndex++;
        } else {
          if (indicesToHighlight.has(nodeIndex)) {
            const span = document.createElement('span');
            span.className = isFile2 ? 
              (diffs.added.some(d => d.index === nodeIndex) ? 'diff-highlight-added' : 'diff-highlight-changed') :
              (diffs.removed.some(d => d.index === nodeIndex) ? 'diff-highlight-removed' : 'diff-highlight-changed');
            span.innerHTML = el.innerHTML;
            el.innerHTML = '';
            el.appendChild(span);
          }
          nodeIndex++;
          traverse(el);
        }
      }
    }
  };
  
  traverse(clone);
  return clone;
};

/**
 * Main comparison function
 * Returns both highlighted HTML and difference summary
 */
export const compareHtmlContent = (htmlString1, htmlString2) => {
  // Parse both files
  const doc1 = parseHTML(htmlString1);
  const doc2 = parseHTML(htmlString2);
  
  if (!doc1 || !doc2) {
    return {
      html1: '<p>Error: Invalid HTML</p>',
      html2: '<p>Error: Invalid HTML</p>',
      hasDifferences: false,
      summary: 'Error parsing HTML files'
    };
  }
  
  // Extract body content
  const body1 = doc1.body || doc1.documentElement;
  const body2 = doc2.body || doc2.documentElement;
  
  // Clean DOM
  const clean1 = cleanDOM(body1);
  const clean2 = cleanDOM(body2);
  
  // Get content structures
  const structure1 = getContentStructure(clean1);
  const structure2 = getContentStructure(clean2);
  
  // Compare structures
  const diffs = compareStructures(structure1, structure2);
  
  // Check if there are any meaningful differences
  const hasDifferences = diffs.added.length > 0 || diffs.removed.length > 0 || diffs.changed.length > 0;
  
  if (!hasDifferences) {
    return {
      html1: clean1.innerHTML,
      html2: clean2.innerHTML,
      hasDifferences: false,
      summary: 'No visible content differences'
    };
  }
  
  // Highlight differences
  const highlighted1 = highlightDifferences(clean1, diffs, false);
  const highlighted2 = highlightDifferences(clean2, diffs, true);
  
  return {
    html1: highlighted1.innerHTML,
    html2: highlighted2.innerHTML,
    hasDifferences: true,
    summary: `${diffs.changed.length} changed, ${diffs.added.length} added, ${diffs.removed.length} removed`,
    details: diffs
  };
};

/**
 * Process a single HTML string to clean it
 */
export const cleanHtmlContent = (htmlString) => {
  const doc = parseHTML(htmlString);
  if (!doc) return '<p>Error: Invalid HTML</p>';
  
  const body = doc.body || doc.documentElement;
  const cleaned = cleanDOM(body);
  
  return cleaned.innerHTML;
};
