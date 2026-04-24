import React, { useState, useEffect } from 'react';
import { compareHtmlContent } from '../utils/HtmlParserUtil';
import '../styles/Components.css';

const HtmlPreviewDiff = ({ file1Content, file2Content, selectedFile1, selectedFile2 }) => {
  const [highlighted1, setHighlighted1] = useState('');
  const [highlighted2, setHighlighted2] = useState('');
  const [hasDifferences, setHasDifferences] = useState(false);
  const [summary, setSummary] = useState('');
  const [syncScroll, setSyncScroll] = useState(true);
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);

  useEffect(() => {
    if (file1Content && file2Content) {
      const result = compareHtmlContent(file1Content, file2Content);
      setHighlighted1(result.html1);
      setHighlighted2(result.html2);
      setHasDifferences(result.hasDifferences);
      setSummary(result.summary);
    }
  }, [file1Content, file2Content]);

  const handleScroll = (e, panelNum) => {
    if (!syncScroll) return;

    const sourceElement = e.target;
    const targetElement = panelNum === 1 
      ? document.getElementById('preview-panel-2')
      : document.getElementById('preview-panel-1');

    if (targetElement) {
      const scrollPercentage = sourceElement.scrollLeft / (sourceElement.scrollWidth - sourceElement.clientWidth);
      targetElement.scrollLeft = scrollPercentage * (targetElement.scrollWidth - targetElement.clientWidth);

      const scrollTop = sourceElement.scrollTop;
      targetElement.scrollTop = scrollTop;
    }
  };

  if (!file1Content || !file2Content) {
    return (
      <div className="html-preview-section">
        <div className="section-header">
          <h2>HTML Preview (Side-by-Side)</h2>
          <p className="placeholder">Select two files and click "Compare" to view side-by-side preview</p>
        </div>
      </div>
    );
  }

  return (
    <div className="html-preview-section">
      <div className="section-header">
        <div>
          <h2>HTML Preview (Side-by-Side)</h2>
          <p className="diff-summary">{summary}</p>
        </div>
        <div className="header-controls">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={syncScroll}
              onChange={(e) => setSyncScroll(e.target.checked)}
            />
            Sync Scroll
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showOnlyDifferences}
              onChange={(e) => setShowOnlyDifferences(e.target.checked)}
              disabled={!hasDifferences}
            />
            Show Only Differences
          </label>
        </div>
      </div>

      {!hasDifferences ? (
        <div className="no-diff-message">
          <div className="no-diff-content">
            <div className="no-diff-icon">✓</div>
            <h3>No Visible Content Differences</h3>
            <p>Both files have the same meaningful content (ignoring CSS, classes, IDs, and formatting)</p>
          </div>
        </div>
      ) : (
        <div className="preview-panels-container">
          {/* File 1 Preview */}
          <div className="preview-panel" id="preview-panel-1" onScroll={(e) => handleScroll(e, 1)}>
            <div className="preview-label">{selectedFile1}</div>
            <div className="preview-content">
              <div
                className="html-preview"
                dangerouslySetInnerHTML={{ __html: highlighted1 }}
              />
            </div>
          </div>

          {/* File 2 Preview */}
          <div className="preview-panel" id="preview-panel-2" onScroll={(e) => handleScroll(e, 2)}>
            <div className="preview-label">{selectedFile2}</div>
            <div className="preview-content">
              <div
                className="html-preview"
                dangerouslySetInnerHTML={{ __html: highlighted2 }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      {hasDifferences && (
        <div className="diff-legend">
          <div className="legend-item">
            <span className="legend-box added"></span>
            <span>Added Content</span>
          </div>
          <div className="legend-item">
            <span className="legend-box removed"></span>
            <span>Removed Content</span>
          </div>
          <div className="legend-item">
            <span className="legend-box changed"></span>
            <span>Changed Content</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HtmlPreviewDiff;
