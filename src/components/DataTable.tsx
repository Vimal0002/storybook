import React, { useState, useMemo, ReactNode } from 'react';
import { DataTableProps } from '../types';

/**
 * A data table with basic functionality like sorting and selection.
 * @template T - The type of the data object in each row.
 */
export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  // Memoize the sorted data to prevent unnecessary re-sorting on every render
  const sortedData = useMemo(() => {
    if (!sortConfig.key) {
      return data;
    }

    // Sort the data in memory based on the current sort configuration
    const sortableData = [...data];
    sortableData.sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue === undefined || aValue === null) return 1;
      if (bValue === undefined || bValue === null) return -1;

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sortableData;
  }, [data, sortConfig]);

  // Handle the sorting logic when a column header is clicked
  const handleSort = (key: keyof T) => {
    setSortConfig((prevConfig) => {
      let direction = 'asc';
      if (prevConfig.key === key && prevConfig.direction === 'asc') {
        direction = 'desc';
      }
      return { key, direction } as { key: keyof T | null; direction: 'asc' | 'desc' };
    });
  };

  // Handle row selection
  const handleRowSelect = (row: T) => {
    const isSelected = selectedRows.some((selectedRow) => selectedRow.id === row.id);
    let newSelectedRows;

    if (selectable) {
      if (isSelected) {
        newSelectedRows = selectedRows.filter(
          (selectedRow) => selectedRow.id !== row.id
        );
      } else {
        newSelectedRows = [...selectedRows, row];
      }
      setSelectedRows(newSelectedRows);
      onRowSelect?.(newSelectedRows);
    }
  };

  // Handle select all functionality
  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
      onRowSelect?.([]);
    } else {
      setSelectedRows(data);
      onRowSelect?.(data);
    }
  };

  // Render content based on state
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center p-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="relative">
          <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading data...</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Please wait while we fetch your data</p>
      </div>
    );
  }

  if (sortedData.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center p-12 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
        <svg className="w-12 h-12 mb-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-lg font-medium">No data to display</p>
        <p className="text-sm">Try adjusting your filters or check back later</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {selectable && (
                <th className="px-6 py-4 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === data.length && data.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:ring-offset-gray-800 transition-colors duration-200"
                    />
                  </div>
                </th>
              )}
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ${
                    column.sortable ? 'cursor-pointer hover:text-gray-700 dark:hover:text-gray-300' : ''
                  } transition-colors duration-200`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center">
                    <span>{column.title}</span>
                    {column.sortable && (
                      <span className="ml-2 flex-shrink-0">
                        {sortConfig.key === column.key ? (
                          sortConfig.direction === 'asc' ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                              <path d="m5 15 7-7 7 7"></path>
                            </svg>
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                              <path d="m19 9-7 7-7-7"></path>
                            </svg>
                          )
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 dark:text-gray-500">
                            <path d="M12 5v14"></path>
                            <path d="m19 12-7 7-7-7"></path>
                          </svg>
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
            {sortedData.map((row, rowIndex) => {
              const isRowSelected = selectedRows.some((selectedRow) => selectedRow.id === row.id);
              return (
                <tr
                  key={rowIndex}
                  className={`
                    group
                    hover:bg-gray-50 dark:hover:bg-gray-800
                    ${isRowSelected ? 'bg-blue-50 dark:bg-blue-950/50' : ''}
                    transition-all duration-200 ease-in-out
                    ${selectable ? 'cursor-pointer' : ''}
                  `}
                  onClick={() => selectable && handleRowSelect(row)}
                >
                  {selectable && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={isRowSelected}
                          onChange={() => handleRowSelect(row)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:ring-offset-gray-800 transition-colors duration-200"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </td>
                  )}
                  {columns.map((column, colIndex) => (
                    <td 
                      key={colIndex} 
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center">
                        {column.render ? column.render(row) : (row[column.key] as ReactNode)}
                      </div>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Table Footer with summary */}
      <div className="bg-gray-50 dark:bg-gray-800 px-6 py-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <span>
            Showing {sortedData.length} of {data.length} entries
          </span>
          {selectable && (
            <span>
              {selectedRows.length} of {data.length} selected
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
