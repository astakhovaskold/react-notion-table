import React from 'react';
import { Column } from '../types';
import TypesMenu from './TypesMenu';
import Trash from '../img/Trash';
import Plus from '../img/Plus';
import ArrowLeft from '../img/ArrowLeft';
import ArrowRight from '../img/ArrowRight';

interface HeaderMenuProps {
  column: Column;
  onClose: () => void;
  onDelete?: (columnId: string) => void;
  onDataTypeChange?: (columnId: string, newType: string) => void;
  onAddOption?: (columnId: string, option: string) => void;
  onAddColumnLeft?: (columnId: string) => void;
  onAddColumnRight?: (columnId: string) => void;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  column,
  onClose,
  onDelete,
  onDataTypeChange,
  onAddOption,
  onAddColumnLeft,
  onAddColumnRight,
}) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(column.id);
    }
    onClose();
  };

  const handleDataTypeChange = (type: string) => {
    if (onDataTypeChange) {
      onDataTypeChange(column.id, type);
    }
    onClose();
  };

  const handleAddOption = (option: string) => {
    if (onAddOption) {
      onAddOption(column.id, option);
    }
  };

  const handleAddColumnLeft = () => {
    if (onAddColumnLeft) {
      onAddColumnLeft(column.id);
    }
    onClose();
  };

  const handleAddColumnRight = () => {
    if (onAddColumnRight) {
      onAddColumnRight(column.id);
    }
    onClose();
  };

  return (
    <div className="header-menu" onClick={e => e.stopPropagation()}>
      <div className="menu-section">
        <div className="menu-item" onClick={handleAddColumnLeft}>
          <ArrowLeft size={16} />
          <span>Insert left</span>
        </div>
        <div className="menu-item" onClick={handleAddColumnRight}>
          <ArrowRight size={16} />
          <span>Insert right</span>
        </div>
      </div>

      <div className="menu-section">
        <TypesMenu
          currentType={column.dataType}
          onTypeChange={handleDataTypeChange}
          onAddOption={
            column.dataType === 'select' ? handleAddOption : undefined
          }
          options={column.options}
        />
      </div>

      <div className="menu-section">
        <div className="menu-item delete" onClick={handleDelete}>
          <Trash size={16} color="#ff4d4f" />
          <span>Delete column</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
