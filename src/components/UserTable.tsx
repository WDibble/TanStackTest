import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

type UserData = {
  name: string
  email: string
  age: number
}

const columnHelper = createColumnHelper<UserData>()

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('age', {
    header: 'Age',
    cell: (info) => info.getValue(),
  }),
]

interface UserTableProps {
  data: UserData[]
}

export default function UserTable({ data }: UserTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-purple-400/30 to-indigo-400/30 backdrop-blur-lg shadow-xl border border-white/20">
      <table className="min-w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-4 text-left text-xs font-medium text-white/80 uppercase tracking-wider border-b border-white/10"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-white/10">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-white/5 transition-colors">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
