import React, { useState, useEffect, useRef } from 'react';
import { usePopper } from 'react-popper';
import { CellProps, SelectOption } from '../types';

const SelectCell: React.FC<CellProps> = ({
  value,
  row,
  column,
  rowIndex,
  updateData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(value || null);

  const referenceRef = useRef<HTMLDivElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);

  const options: SelectOption[] = column.options
    ? column.options.map(opt => ({ value: opt, label: opt }))
    : [];

  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    {
      placement: 'bottom-start',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 5],
          },
        },
      ],
    }
  );

  useEffect(() => {
    setSelected(value || null);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popperRef.current &&
        !popperRef.current.contains(event.target as Node) &&
        referenceRef.current &&
        !referenceRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: SelectOption) => {
    setSelected(option.value);
    updateData(rowIndex, column.id, option.value);
    setIsOpen(false);
  };

  return (
    <div className="cell select-cell">
      <div
        className="cell-content select"
        onClick={toggleDropdown}
        ref={referenceRef}
      >
        {selected || 'Select option...'}
      </div>

      {isOpen && (
        <div
          className="select-dropdown"
          ref={popperRef}
          style={styles.popper}
          {...attributes.popper}
        >
          {options.map(option => (
            <div
              key={option.value}
              className={`select-option ${
                selected === option.value ? 'selected' : ''
              }`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
          {options.length === 0 && (
            <div className="select-no-options">No options available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectCell;
