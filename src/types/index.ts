export interface Column {
  id: string;
  label: string;
  accessor: string;
  dataType: 'text' | 'number' | 'select';
  options?: string[];
  width?: number;
  minWidth?: number;
  maxWidth?: number;
}

export interface Row {
  id: string;
  [key: string]: any;
}

export interface CellProps {
  value: any;
  row: Row;
  column: Column;
  rowIndex: number;
  updateData: (rowIndex: number, columnId: string, value: any) => void;
}

export interface TableProps {
  columns: Column[];
  data: Row[];
  onDataChange?: (data: Row[]) => void;
  onColumnsChange?: (columns: Column[]) => void;
  height?: number;
  width?: number;
  rowHeight?: number;
  virtualized?: boolean;
  editable?: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface HeaderProps {
  column: Column;
  onRename?: (columnId: string, newName: string) => void;
  onResize?: (columnId: string, newWidth: number) => void;
  onDelete?: (columnId: string) => void;
  onDataTypeChange?: (columnId: string, newType: string) => void;
  onAddOption?: (columnId: string, option: string) => void;
  onAddColumnLeft?: (columnId: string) => void;
  onAddColumnRight?: (columnId: string) => void;
}

export interface TableInstance {
  getTableProps: () => any;
  getTableBodyProps: () => any;
  headerGroups: any[];
  rows: any[];
  prepareRow: (row: any) => void;
}
