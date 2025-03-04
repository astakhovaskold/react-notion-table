import React from 'react';
import Plus from '../img/Plus';

interface AddColumnHeaderProps {
  onAddColumn: () => void;
}

const AddColumnHeader: React.FC<AddColumnHeaderProps> = ({ onAddColumn }) => {
  return (
    <div className="add-column-header" onClick={onAddColumn}>
      <Plus size={16} />
      <span>Add Column</span>
    </div>
  );
};

export default AddColumnHeader;
