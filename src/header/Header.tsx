import React, { useState, useRef, useEffect } from 'react';
import { Column, HeaderProps } from '../types';
import HeaderMenu from './HeaderMenu';
import DataTypeIcon from './DataTypeIcon';

const Header: React.FC<HeaderProps> = ({
  column,
  onRename,
  onResize,
  onDelete,
  onDataTypeChange,
  onAddOption,
  onAddColumnLeft,
  onAddColumnRight,
}) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(column.label);
  const [showMenu, setShowMenu] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);
  const [startWidth, setStartWidth] = useState<number | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setName(column.label);
  }, [column.label]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDoubleClick = () => {
    setEditing(true);
    setTimeout(() => {
      if (nameInputRef.current) {
        nameInputRef.current.focus();
        nameInputRef.current.select();
      }
    }, 0);
  };

  const handleBlur = () => {
    setEditing(false);
    if (onRename && name !== column.label) {
      onRename(column.id, name);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };

  const handleResizerMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setStartX(e.clientX);
    setStartWidth(headerRef.current?.offsetWidth || null);

    document.addEventListener('mousemove', handleResizerMouseMove);
    document.addEventListener('mouseup', handleResizerMouseUp);
  };

  const handleResizerMouseMove = (e: MouseEvent) => {
    if (startX === null || startWidth === null) return;

    const width = startWidth + (e.clientX - startX);
    if (headerRef.current) {
      headerRef.current.style.width = `${width}px`;
    }
  };

  const handleResizerMouseUp = (e: MouseEvent) => {
    document.removeEventListener('mousemove', handleResizerMouseMove);
    document.removeEventListener('mouseup', handleResizerMouseUp);

    if (startX === null || startWidth === null) return;

    const width = startWidth + (e.clientX - startX);
    if (onResize) {
      onResize(column.id, width);
    }

    setStartX(null);
    setStartWidth(null);
  };

  return (
    <div
      className="header"
      ref={headerRef}
      style={{ width: column.width ? `${column.width}px` : undefined }}
    >
      <div
        className="header-content"
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleContextMenu}
      >
        <div className="header-type-icon">
          <DataTypeIcon dataType={column.dataType} />
        </div>

        {editing ? (
          <input
            ref={nameInputRef}
            className="header-name-input"
            value={name}
            onChange={e => setName(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={e => {
              if (e.key === 'Enter') handleBlur();
              if (e.key === 'Escape') {
                setName(column.label);
                setEditing(false);
              }
            }}
          />
        ) : (
          <div className="header-name">{column.label}</div>
        )}
      </div>

      {showMenu && (
        <HeaderMenu
          column={column}
          onClose={() => setShowMenu(false)}
          onDelete={onDelete}
          onDataTypeChange={onDataTypeChange}
          onAddOption={onAddOption}
          onAddColumnLeft={onAddColumnLeft}
          onAddColumnRight={onAddColumnRight}
        />
      )}

      <div className="resizer" onMouseDown={handleResizerMouseDown} />
    </div>
  );
};

export default Header;
