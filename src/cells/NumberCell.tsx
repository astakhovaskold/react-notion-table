import React, { useState, useEffect } from 'react';
import { CellProps } from '../types';

const NumberCell: React.FC<CellProps> = ({
  value,
  row,
  column,
  rowIndex,
  updateData,
}) => {
  const [editing, setEditing] = useState(false);
  const [number, setNumber] = useState<number | ''>(
    value !== undefined && value !== null ? Number(value) : ''
  );

  useEffect(() => {
    setNumber(value !== undefined && value !== null ? Number(value) : '');
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || !isNaN(Number(val))) {
      setNumber(val === '' ? '' : Number(val));
    }
  };

  const onBlur = () => {
    setEditing(false);
    updateData(rowIndex, column.id, number);
  };

  return (
    <div
      className={`cell ${editing ? 'editing' : ''}`}
      onDoubleClick={() => setEditing(true)}
    >
      {editing ? (
        <input
          className="cell-input"
          value={number}
          onChange={handleChange}
          onBlur={onBlur}
          autoFocus
          type="number"
        />
      ) : (
        <div className="cell-content number">
          {number !== '' ? number : null}
        </div>
      )}
    </div>
  );
};

export default NumberCell;
