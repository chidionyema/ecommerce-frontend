import React, { useRef, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  Indent,
  Outdent,
  Code,
  Table
} from 'lucide-react';
import styles from '../../styles/admin/RichTextEditor.module.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  minHeight?: string;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  minHeight = '300px',
  placeholder = 'Enter detailed product description here...'
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  // Initialize editor with value
  useEffect(() => {
    if (editorRef.current) {
      if (!editorRef.current.innerHTML || editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
  }, [value]);

  // Handle editor content changes
  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // Execute command on editor
  // Now the second parameter is optional (value?: string) instead of defaulting to null
  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    handleInput();
    editorRef.current?.focus();
  };

  // Format text with heading
  const formatHeading = (level: number) => {
    execCommand('formatBlock', `<h${level}>`);
  };

  // Insert link
  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  // Insert image
  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      execCommand('insertImage', url);
    }
  };

  // Insert table
  const insertTable = () => {
    const rows = prompt('Number of rows:', '3');
    const cols = prompt('Number of columns:', '3');

    if (rows && cols) {
      const rowsNum = parseInt(rows, 10);
      const colsNum = parseInt(cols, 10);

      if (isNaN(rowsNum) || isNaN(colsNum)) {
        return;
      }

      let tableHTML = '<table border="1" style="width:100%; border-collapse: collapse;">';

      // Create header row
      tableHTML += '<tr>';
      for (let i = 0; i < colsNum; i++) {
        tableHTML += `<th style="padding: 8px; border: 1px solid #ddd;">Header ${i + 1}</th>`;
      }
      tableHTML += '</tr>';

      // Create data rows
      for (let i = 0; i < rowsNum - 1; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < colsNum; j++) {
          tableHTML += `<td style="padding: 8px; border: 1px solid #ddd;">Cell ${i + 1}-${j + 1}</td>`;
        }
        tableHTML += '</tr>';
      }

      tableHTML += '</table><p></p>';

      execCommand('insertHTML', tableHTML);
    }
  };

  return (
    <div className={styles.editorContainer}>
      <div className={styles.toolbar}>
        {/* Text formatting */}
        <button 
          type="button" 
          className={styles.toolbarButton} 
          onClick={() => execCommand('bold')}
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button 
          type="button" 
          className={styles.toolbarButton} 
          onClick={() => execCommand('italic')}
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button 
          type="button" 
          className={styles.toolbarButton} 
          onClick={() => execCommand('underline')}
          title="Underline"
        >
          <Underline size={18} />
        </button>
        
        <div className={styles.divider}></div>
        
        {/* Headings */}
        <button 
          type="button" 
          className={styles.toolbarButton} 
          onClick={() => formatHeading(1)}
          title="Heading 1"
        >
          <Heading1 size={18} />
        </button>
        <button 
          type="button" 
          className={styles.toolbarButton} 
          onClick={() => formatHeading(2)}
          title="Heading 2"
        >
          <Heading2 size={18} />
        </button>
        <button 
          type="button" 
          className={styles.toolbarButton} 
          onClick={() => formatHeading(3)}
          title="Heading 3"
        >
          <Heading3 size={18} />
        </button>
        
        <div className={styles.divider}></div>
        
        {/* Lists */}
        <button 
          type="button" 
          className={styles.toolbarButton} 
          onClick={() => execCommand('insertUnorderedList')}
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button 
          type="button" 
          className={styles.toolbarButton} 
          onClick={() => execCommand('insertOrderedList')}
          title="Numbered List"
        >
          <ListOrdered size={18} />
        </button>
        <button 
          type="button" 
          className={styles.toolbarButton} 
          onClick={() => execCommand('indent')}
          title="Indent"
        >
          <Indent size={18} />
        </button>
        <button 
          type="button" 
          className={styles.toolbarButton} 
          onClick={() => execCommand('outdent')}
          title="Outdent"
        >
          <Outdent size={18} />
        </button>
        
        <div className={styles.divider}></div>
        
        {/* Alignment */}
        <button 
          type="button" 
          className={styles.toolbarButton} 
          onClick={() => execCommand('justifyLeft')}
          title="Align Left"
        >
          <AlignLeft size={18} />
        </button>
        <button 
          type="button" 
          className={styles.toolbarButton} 
          onClick={() => execCommand('justifyCenter')}
          title="Align Center"
        >
          <AlignCenter size={18} />
        </button>
        <button 
          type="button" 
          className={styles.toolbarButton} 
          onClick={() => execCommand('justifyRight')}
          title="Align Right"
        >
          <AlignRight size={18} />
        </button>
        
        <div className={styles.divider}></div>
        
        {/* Special elements */}
        <button 
          type="button" 
          className={styles.toolbarButton} 
          onClick={insertLink}
          title="Insert Link"
        >
          <Link size={18} />
        </button>
        <button 
          type="button" 
          className={styles.toolbarButton} 
          onClick={insertImage}
          title="Insert Image"
        >
          <Image size={18} />
        </button>
        <button 
          type="button" 
          className={styles.toolbarButton} 
          onClick={insertTable}
          title="Insert Table"
        >
          <Table size={18} />
        </button>
        <button 
          type="button" 
          className={styles.toolbarButton} 
          onClick={() => execCommand('formatBlock', '<pre>')}
          title="Code Block"
        >
          <Code size={18} />
        </button>
      </div>

      {/* Editor content area */}
      <div
          ref={editorRef}
          className={styles.editorContent}
          contentEditable={true} // Make sure this is explicitly true
          onInput={handleInput}
          style={{ minHeight }}
          // Removed placeholder here
          dangerouslySetInnerHTML={{ __html: value }}
      >
      </div>
        {/* Added separate placeholder element */}
        {!value && (
            <div
            className={styles.placeholder}
            style={{
                position: 'absolute',
                top: '10px', // Adjust these values as needed for your design
                left: '10px', // and layout.  These were often styled inline.
                pointerEvents: 'none',
                userSelect: 'none',
                color: '#aaa', // Placeholder color
            }}
            onClick={() => editorRef.current?.focus()} // Focus the editor when placeholder is clicked
            >
            {placeholder}
            </div>
      )}
    </div>
  );
};

export default RichTextEditor;