import React from 'react';

export interface TerminalTableColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T, index: number) => React.ReactNode;
  align?: 'left' | 'right' | 'center';
}

export interface TerminalTableProps<T extends Record<string, unknown>> {
  columns: TerminalTableColumn<T>[];
  rows: T[];
  getRowKey?: (row: T, index: number) => string | number;
  className?: string;
}

export function TerminalTable<T extends Record<string, unknown>>({
  columns,
  rows,
  getRowKey,
  className = '',
}: TerminalTableProps<T>) {
  return (
    <div className={`tui-table-wrap ${className}`.trim()}>
      <table className="tui-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} style={{ textAlign: col.align ?? 'left' }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={getRowKey ? getRowKey(row, i) : i}>
              {columns.map((col) => (
                <td key={String(col.key)} style={{ textAlign: col.align ?? 'left' }}>
                  {col.render
                    ? col.render(row, i)
                    : String(row[col.key as keyof T] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
