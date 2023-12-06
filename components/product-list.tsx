"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Edit } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"


import { Product } from "@/lib/specs"
import ProductForm from "@/components/product-form"
import { Separator } from "@/components/ui/separator"
import { toast } from 'sonner'
import { clientError } from "@/lib/utils-client"
import { cn, formatPrice } from "@/lib/utils"




export const columns: ColumnDef<Product>[] = [
    {
        id: "actions",
        enableHiding: false,
        size: 10,
        cell: ({ row, table }) => {
            return (
                <SheetTrigger asChild>
                    <Button onClick={() => {
                        //@ts-ignore
                        return table.options.meta?.editForm(row)
                    }} variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                    </Button>
                </SheetTrigger>
            )
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nom
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "categoryId",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Categorie
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ table, row }) => {
            const categoryId = row.getValue("categoryId")
            //@ts-ignore
            const name = table.options.meta?.categoriesIndex[categoryId].name
            return (<div className="capitalize">{name}</div>)
        },
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <div className="text-right">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Prix
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>

                </div>
            )
        },
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))
            const formatted = formatPrice(price)

            return <div className="text-right font-medium">{formatted}</div>
        },
    }
]

type CatalogProps = {
    products: Product[],
    categories: any,
    onSubmit: any
}

export default function ProductsList({ products = [], categories = {}, onSubmit: onUpdate }: CatalogProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const [data, setData] = React.useState(products)
    const [selected, setSelected] = React.useState<any>()

    React.useEffect(() => {
        setData(products)
    }, [products]);


    const table = useReactTable({
        data,
        columns,
        autoResetAll: false,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        meta: {
            //@ts-ignore
            categoriesIndex: categories.reduce((obj, item) => (obj[item.id] = item, obj), {}),
            editForm: (row: any) => {
                setSelected(row)
            }

        }
    })



    const [isOpen, setOpen] = React.useState(false)
    const onSubmit = async (data: Product) => {
        const { error } = await onUpdate(data)
        if (clientError(error)) return

        // update value on the fly, no need to revalidatePath on the server
        selected.original = data
        setData(old => old.map((row, index) => {
            if (selected.index == index) return selected.original
            return row
        }))
        toast.success("Produit modifié")
        setOpen(false)
    }

    return (
        <Sheet open={isOpen} onOpenChange={setOpen}>
            <div className="w-full overflow-x-auto">
                <div className="flex items-center py-4">
                    <Input
                        type="search"
                        placeholder="Chercher un produit..."
                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) => {
                            table.resetPagination(true)
                            table.getColumn("name")?.setFilterValue(event.target.value)
                        }}
                        className="max-w-sm"
                    />
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header, index) => {
                                        return (
                                            <TableHead key={header.id} className={cn({"w-0": index==0})}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredRowModel().rows.length} produits
                    </div>
                    {(table.getCanPreviousPage() || table.getCanNextPage()) && <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {"<"}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            {">"}
                        </Button>
                    </div>}
                </div>
            </div>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Édition produit</SheetTitle>
                </SheetHeader>
                <Separator className="my-4" />
                <ProductForm data={selected?.original} categories={categories} onSubmit={onSubmit} />
            </SheetContent>
        </Sheet>
    )
}
