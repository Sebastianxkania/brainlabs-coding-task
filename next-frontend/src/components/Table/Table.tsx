import TextCell from "@/components/TextCell/TextCell";
import StatusCell from "@/components/StatusCell/StatusCell";
import * as CampaignTypes from '@/api_services/campaign/campaignTypes';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";

// Icons
import { FaSort } from "react-icons/fa";

type RowT = CampaignTypes.CampaignResponse;


const Table = ({
  tableData = [],
  noDataMessage = 'No available data',
  pagination = 5, // default pagination number
}:{
  tableData: CampaignTypes.CampaignResponse[];
  noDataMessage?: string;
  title?: string;
  pagination?: number; // default pagination number
}) => {


  // Table Columns Definition
  const columns:ColumnDef<RowT, unknown>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: () => <span className="g-h-1">Name</span>,
      enableSorting: true,
      cell: (info) => <TextCell cell={info} />,
    },
    {
      id: "budget",
      accessorKey: "budget",
      header: () => <span className="g-h-1">Budget</span>,
      enableSorting: true,
      cell: (info) => <TextCell cell={info} />,
    },
    {
      id: "spend",
      accessorKey: "spend",
      header: () => <span className="g-h-1">Spend</span>,
      enableSorting: true,
      cell: (info) => <TextCell cell={info} />,
    },
    {
      id: "status",
      accessorKey: "status",
      header: () => <span className="g-h-1">Status</span>,
      enableSorting: true,
      cell: (info) => <StatusCell cell={info} />,
    },
  ]



  const tableInstance = useReactTable({
    data: tableData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
    initialState: { pagination: { pageSize: pagination } },
  });
  

  return (
    <div>  
        <div className="shadow-md rounded-lg overflow-auto">
        <table className="table-auto border-collapse w-full">
          {/* Table Header */}
          <thead className="h-[54px] border border-[var(--border-colour-light)] rounded-lg">
            {tableInstance.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`px-4 py-1 g-lb-1  ${
                      header.column.id === "select" ? "text-center" : ""
                    }`}
                    style={header.column.id === "select" ? { width: "30px" } : { }}
                  > 
                    <div className="flex gap-[10px] ">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {/* Header Sort */}
                      {header.column.getCanSort() && 
                      <div className="flex items-center gap-[10px] ">
                        <FaSort  
                          size={11} 
                          onClick={header.column.getToggleSortingHandler()}
                          className="cursor-pointer select-none g-h-1"
                        />
                      </div>
                      }
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {/* Table Body */}
          <tbody className=" bg-white border border-[var(--border-colour-light)]">
            {tableInstance.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border-b px-4 text-sm border-[var(--border-colour-light)]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        
        {tableData?.length === 0 && <div className="bg-white border-l border-r border-b h-[54px] font-medium text-gray-600 text-[14px] border-[var(--border-colour-light)] flex items-center justify-center ">{noDataMessage}</div>}

        {/* Table Pagination Controls */}
        <div className="flex justify-between items-center border-l border-r border-[var(--border-colour-light)] h-[54px] px-4">
          <button
            className="px-4 h-[32px] bg-blue-500 text-white rounded-lg disabled:bg-blue-100 cursor-pointer hover:bg-blue-600 "
            onClick={() => tableInstance.previousPage()}
            disabled={!tableInstance.getCanPreviousPage()}
          >
            Previous
          </button>

          <span className="g-l-1">
            Page {tableInstance.getState().pagination.pageIndex + 1} of{" "}
            {tableInstance.getPageCount()}
          </span>
          
          <button
            className="px-4 h-[32px] bg-blue-500 text-white rounded-lg disabled:bg-blue-100 cursor-pointer hover:bg-blue-600 "
            onClick={() => tableInstance.nextPage()}
            disabled={!tableInstance.getCanNextPage()}
          >
            Next
          </button>
        </div>
        </div>


    </div>
  );
};

export default Table;