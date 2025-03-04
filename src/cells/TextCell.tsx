import React, { useState, useEffect, useRef } from 'react';
import ContentEditable from 'react-contenteditable';
import { CellProps } from '../types';

const TextCell: React.FC<CellProps> = ({
  value,
  row,
  column,
  rowIndex,
  updateData,
}) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value || '');
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setText(value || '');
  }, [value]);

  const handleChange = (e: { target: { value: string } }) => {
    setText(e.target.value);
  };

  const onBlur = () => {
    setEditing(false);
    if (contentRef.current) {
      updateData(rowIndex, column.id, contentRef.current.innerHTML);
    }
  };

  return (
    <div
      className={`cell ${editing ? 'editing' : ''}`}
      onDoubleClick={() => setEditing(true)}
    >
      <ContentEditable
        className="cell-content"
        innerRef={contentRef}
        html={text}
        disabled={!editing}
        onChange={handleChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default TextCell;
