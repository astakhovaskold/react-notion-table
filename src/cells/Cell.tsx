import React from 'react';
import { CellProps, Column, Row } from '../types';
import TextCell from './TextCell';
import NumberCell from './NumberCell';
import SelectCell from './SelectCell';

interface CellComponentProps {
  value: any;
  row: Row;
  column: Column;
  rowIndex: number;
  updateData: (rowIndex: number, columnId: string, value: any) => void;
}

const Cell: React.FC<CellComponentProps> = ({
  value,
  row,
  column,
  rowIndex,
  updateData,
}) => {
  const cellProps: CellProps = {
    value,
    row,
    column,
    rowIndex,
    updateData,
  };

  // Выбираем компонент в зависимости от типа данных колонки
  switch (column.dataType) {
    case 'number':
      return <NumberCell {...cellProps} />;
    case 'select':
      return <SelectCell {...cellProps} />;
    case 'text':
    default:
      return <TextCell {...cellProps} />;
  }
};

export default Cell;
