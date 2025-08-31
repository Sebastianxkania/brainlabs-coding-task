import React from "react";
import { CellContext } from "@tanstack/react-table";

type TextCellProps<TData, TValue> = {
  cell: CellContext<TData, TValue>;
};

function TextCell<TData, TValue>({ cell }: TextCellProps<TData, TValue>) {
  return (
    <div className="flex items-center g-l-1 h-[54px]">
      {String(cell.getValue() ?? "")}
    </div>
  );
}

export default TextCell;
