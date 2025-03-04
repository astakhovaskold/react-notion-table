import React, { useState, useMemo, useCallback } from 'react';
import { useTable, useSortBy } from 'react-table';
import { FixedSizeList } from 'react-window';
import update from 'immutability-helper';
import { faker } from '@faker-js/faker';
import { Column, Row, TableInstance } from './types';
import Cell from './cells/Cell';
import Header from './header/Header';
import AddColumnHeader from './header/AddColumnHeader';

const generateId = () => `_${Math.random().toString(36).substr(2, 9)}`;

const App: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'name',
      label: 'Name',
      accessor: 'name',
      dataType: 'text',
      width: 200,
    },
    {
      id: 'age',
      label: 'Age',
      accessor: 'age',
      dataType: 'number',
      width: 100,
    },
    {
      id: 'status',
      label: 'Status',
      accessor: 'status',
      dataType: 'select',
      options: ['Active', 'Inactive', 'Pending'],
      width: 150,
    },
  ]);

  const [data, setData] = useState<Row[]>(() => {
    return Array(100)
      .fill(null)
      .map((_, i) => ({
        id: i.toString(),
        name: faker.person.fullName(),
        age: Math.floor(Math.random() * 50) + 18,
        status: ['Active', 'Inactive', 'Pending'][
          Math.floor(Math.random() * 3)
        ],
      }));
  });

  const updateData = useCallback(
    (rowIndex: number, columnId: string, value: any) => {
      setData(prevData =>
        update(prevData, {
          [rowIndex]: {
            [columnId]: { $set: value },
          },
        })
      );
    },
    []
  );

  const handleRenameColumn = useCallback(
    (columnId: string, newName: string) => {
      setColumns(prevColumns =>
        prevColumns.map(col =>
          col.id === columnId ? { ...col, label: newName } : col
        )
      );
    },
    []
  );

  const handleResizeColumn = useCallback(
    (columnId: string, newWidth: number) => {
      setColumns(prevColumns =>
        prevColumns.map(col =>
          col.id === columnId ? { ...col, width: newWidth } : col
        )
      );
    },
    []
  );

  const handleDeleteColumn = useCallback((columnId: string) => {
    setColumns(prevColumns => prevColumns.filter(col => col.id !== columnId));
  }, []);

  const handleDataTypeChange = useCallback(
    (columnId: string, newType: string) => {
      setColumns(prevColumns =>
        prevColumns.map(col => {
          if (col.id === columnId) {
            const updatedCol = {
              ...col,
              dataType: newType as 'text' | 'number' | 'select',
            };

            // Если тип изменяется на select, добавляем пустой массив опций
            if (newType === 'select' && !updatedCol.options) {
              updatedCol.options = [];
            }

            return updatedCol;
          }
          return col;
        })
      );
    },
    []
  );

  const handleAddOption = useCallback((columnId: string, option: string) => {
    setColumns(prevColumns =>
      prevColumns.map(col => {
        if (col.id === columnId && col.dataType === 'select') {
          const options = col.options || [];
          if (!options.includes(option)) {
            return { ...col, options: [...options, option] };
          }
        }
        return col;
      })
    );
  }, []);

  const handleAddColumnAt = useCallback((position: number) => {
    const newColumn: Column = {
      id: generateId(),
      label: 'New Column',
      accessor: `col_${generateId()}`,
      dataType: 'text',
      width: 150,
    };

    setColumns(prevColumns => [
      ...prevColumns.slice(0, position),
      newColumn,
      ...prevColumns.slice(position),
    ]);
  }, []);

  const handleAddColumnLeft = useCallback(
    (columnId: string) => {
      const index = columns.findIndex(col => col.id === columnId);
      if (index !== -1) {
        handleAddColumnAt(index);
      }
    },
    [columns, handleAddColumnAt]
  );

  const handleAddColumnRight = useCallback(
    (columnId: string) => {
      const index = columns.findIndex(col => col.id === columnId);
      if (index !== -1) {
        handleAddColumnAt(index + 1);
      }
    },
    [columns, handleAddColumnAt]
  );

  const handleAddColumnEnd = useCallback(() => {
    handleAddColumnAt(columns.length);
  }, [columns.length, handleAddColumnAt]);

  const handleAddRow = useCallback(() => {
    const newRow: Row = {
      id: generateId(),
    };

    columns.forEach(column => {
      newRow[column.accessor] = null;
    });

    setData(prevData => [...prevData, newRow]);
  }, [columns]);

  const tableData = useMemo(() => data, [data]);
  const tableColumns = useMemo(
    () =>
      columns.map(column => ({
        Header: ({ column: reactColumn }: { column: any }) => (
          <Header
            column={column}
            onRename={handleRenameColumn}
            onResize={handleResizeColumn}
            onDelete={handleDeleteColumn}
            onDataTypeChange={handleDataTypeChange}
            onAddOption={handleAddOption}
            onAddColumnLeft={handleAddColumnLeft}
            onAddColumnRight={handleAddColumnRight}
          />
        ),
        accessor: column.accessor,
        width: column.width,
        Cell: ({ value, row: { original, index } }: any) => (
          <Cell
            value={value}
            row={original}
            column={column}
            rowIndex={index}
            updateData={updateData}
          />
        ),
      })),
    [
      columns,
      handleRenameColumn,
      handleResizeColumn,
      handleDeleteColumn,
      handleDataTypeChange,
      handleAddOption,
      handleAddColumnLeft,
      handleAddColumnRight,
      updateData,
    ]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: tableColumns,
        data: tableData,
      },
      useSortBy
    ) as TableInstance;

  // Виртуализированная строка
  const RenderRow = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className="tr"
        >
          {row.cells.map(cell => (
            <div {...cell.getCellProps()} className="td">
              {cell.render('Cell')}
            </div>
          ))}
        </div>
      );
    },
    [prepareRow, rows]
  );

  return (
    <div className="App">
      <div className="table-container">
        <div {...getTableProps()} className="table">
          <div className="thead">
            {headerGroups.map(headerGroup => (
              <div {...headerGroup.getHeaderGroupProps()} className="tr">
                {headerGroup.headers.map(column => (
                  <div {...column.getHeaderProps()} className="th">
                    {column.render('Header')}
                  </div>
                ))}
                <div className="th add-column">
                  <AddColumnHeader onAddColumn={handleAddColumnEnd} />
                </div>
              </div>
            ))}
          </div>

          <div {...getTableBodyProps()} className="tbody">
            <FixedSizeList
              height={500}
              width="100%"
              itemCount={rows.length}
              itemSize={35}
            >
              {RenderRow}
            </FixedSizeList>
          </div>
        </div>

        <div className="actions">
          <button className="add-row-button" onClick={handleAddRow}>
            Add Row
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
