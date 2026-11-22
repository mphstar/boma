import type { ReactNode } from 'react';

interface AdminTableProps {
  head: ReactNode[];
  children: ReactNode;
}

export function AdminTable({ head, children }: AdminTableProps) {
  return (
    <div className="table-wrap">
      <table className="tb">
        <thead>
          <tr>
            {head.map((cell, index) => (
              <th key={index}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
