import React from "react";
import { CellContext } from "@tanstack/react-table";

type Status = "draft" | "active" | "paused" | "completed";

const statusStyles: Record<Status, string> = {
  draft: "bg-gray-100 text-gray-700 border border-gray-300",
  active: "bg-green-100 text-green-700 border border-green-300",
  paused: "bg-yellow-100 text-yellow-700 border border-yellow-300",
  completed: "bg-blue-100 text-blue-700 border border-blue-300",
};

type StatusCellProps<TData> = {
  cell: CellContext<TData, Status>;
};

function StatusCell<TData>({ cell }: StatusCellProps<TData>) {
  const status = cell.getValue();

  return (
    <div className="flex items-center h-[54px]">
      <span
        className={`px-2 py-1 text-sm rounded-lg font-medium capitalize ${
          statusStyles[status]
        }`}
      >
        {status}
      </span>
    </div>
  );
}

export default StatusCell;
