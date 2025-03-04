import React, { useState } from 'react';
import Text from '../img/Text';
import Hash from '../img/Hash';
import Multi from '../img/Multi';
import Plus from '../img/Plus';

interface TypesMenuProps {
  currentType: string;
  onTypeChange: (type: string) => void;
  onAddOption?: (option: string) => void;
  options?: string[];
}

const TypesMenu: React.FC<TypesMenuProps> = ({
  currentType,
  onTypeChange,
  onAddOption,
  options = [],
}) => {
  const [newOption, setNewOption] = useState('');

  const handleAddOption = (e: React.FormEvent) => {
    e.preventDefault();
    if (newOption.trim() && onAddOption) {
      onAddOption(newOption.trim());
      setNewOption('');
    }
  };

  return (
    <div className="types-menu">
      <div className="menu-item" onClick={() => onTypeChange('text')}>
        <Text size={16} />
        <span className={currentType === 'text' ? 'selected' : ''}>Text</span>
      </div>
      <div className="menu-item" onClick={() => onTypeChange('number')}>
        <Hash size={16} />
        <span className={currentType === 'number' ? 'selected' : ''}>
          Number
        </span>
      </div>
      <div className="menu-item" onClick={() => onTypeChange('select')}>
        <Multi size={16} />
        <span className={currentType === 'select' ? 'selected' : ''}>
          Select
        </span>
      </div>

      {currentType === 'select' && onAddOption && (
        <div className="select-options-section">
          <div className="options-list">
            {options.map((option, index) => (
              <div key={index} className="option-item">
                {option}
              </div>
            ))}
          </div>
          <form onSubmit={handleAddOption}>
            <div className="add-option-form">
              <input
                type="text"
                value={newOption}
                onChange={e => setNewOption(e.target.value)}
                placeholder="New option..."
                className="option-input"
              />
              <button type="submit" className="add-option-button">
                <Plus size={14} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TypesMenu;
