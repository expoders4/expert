import Link from 'next/link'
import {
    Eye,
    Edit2,
} from 'lucide-react'

interface Column {
    key: string
    label: string
    render?: (row: any) => React.ReactNode
}

interface CommonTableProps {
    data: any[]
    columns: Column[]

    resource: string

    emptyMessage?: string

    showView?: boolean
    showEdit?: boolean
    showDelete?: boolean

    viewPath?: (row: any) => string
    editPath?: (row: any) => string

    deleteComponent?: (
        row: any
    ) => React.ReactNode

    currentPage?: number
    totalPages?: number

    queryParams?: Record<
        string,
        string
    >
}

export default function CommonTable({
    data,
    columns,
    resource,
    emptyMessage = 'No data found',
    showView = true,
    showEdit = true,
    showDelete = true,
    viewPath,
    editPath,
    deleteComponent,
    currentPage,
    totalPages,
    queryParams,
}: CommonTableProps) {
    return (
        <div className="admin-card overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-stone-100 text-xs text-stone-500 uppercase tracking-wider">
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="text-left px-6 py-4 font-medium"
                            >
                                {col.label}
                            </th>
                        ))}

                        <th className="text-right px-6 py-4 font-medium">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-stone-50">
                    {data.length > 0 ? (
                        data.map((row) => (
                            <tr
                                key={row.id}
                                className="hover:bg-stone-50 transition-colors"
                            >
                                {columns.map((col) => (
                                    <td
                                        key={col.key}
                                        className="px-6 py-4"
                                    >
                                        {col.render
                                            ? col.render(row)
                                            : row[col.key] instanceof Date
                                                ? row[col.key].toLocaleDateString()
                                                : row[col.key] || '—'}
                                    </td>
                                ))}

                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        {showView &&
                                            viewPath && (
                                                <Link
                                                    href={viewPath(
                                                        row
                                                    )}
                                                    target="_blank"
                                                    className="p-1.5 text-stone-400 hover:text-blue-600 transition-colors"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                            )}

                                        {showEdit &&
                                            editPath && (
                                                <Link
                                                    href={editPath(
                                                        row
                                                    )}
                                                    className="p-1.5 text-stone-400 hover:text-brand-600 transition-colors"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                            )}

                                        {showDelete &&
                                            deleteComponent?.(
                                                row
                                            )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={
                                    columns.length + 1
                                }
                                className="text-center py-16 text-stone-400"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
                    
            {totalPages &&
                totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 px-6 py-5 border-t border-stone-100">
                        {Array.from({
                            length: totalPages,
                        }).map((_, i) => {
                            const page = i + 1

                            const params =
                                new URLSearchParams({
                                    ...(queryParams ||
                                        {}),
                                    page: String(page),
                                })

                            return (
                                
                                <Link
                                    key={page}
                                    href={`?${params.toString()}`}
                                    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm transition-all ${currentPage === page
                                            ? 'bg-brand-600 text-white'
                                            : 'border border-stone-200 text-stone-600 hover:border-brand-400'
                                        }`}
                                >
                                    {page}
                                </Link>
                            )
                        })}
                    </div>
                )}
        </div>
    )
}