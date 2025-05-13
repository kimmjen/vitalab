import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tableVariants = cva("w-full caption-bottom text-sm", {
  variants: {
    variant: {
      default: "",
      bordered: "border border-gray-200 dark:border-gray-700",
      striped: "[&_tbody_tr:nth-child(even)]:bg-gray-50 [&_tbody_tr:nth-child(even)]:dark:bg-gray-800/50",
      hoverable: "[&_tbody_tr:hover]:bg-gray-50 [&_tbody_tr:hover]:dark:bg-gray-800/70",
      card: "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm",
      minimal: "border-collapse [&_th]:border-b [&_th]:border-gray-200 [&_th]:dark:border-gray-700 [&_td]:border-b [&_td]:border-gray-100 [&_td]:dark:border-gray-800",
    },
    radius: {
      none: "",
      sm: "rounded-sm [&_thead_tr:first-child_th:first-child]:rounded-tl-sm [&_thead_tr:first-child_th:last-child]:rounded-tr-sm [&_tbody_tr:last-child_td:first-child]:rounded-bl-sm [&_tbody_tr:last-child_td:last-child]:rounded-br-sm",
      md: "rounded-md [&_thead_tr:first-child_th:first-child]:rounded-tl-md [&_thead_tr:first-child_th:last-child]:rounded-tr-md [&_tbody_tr:last-child_td:first-child]:rounded-bl-md [&_tbody_tr:last-child_td:last-child]:rounded-br-md",
      lg: "rounded-lg [&_thead_tr:first-child_th:first-child]:rounded-tl-lg [&_thead_tr:first-child_th:last-child]:rounded-tr-lg [&_tbody_tr:last-child_td:first-child]:rounded-bl-lg [&_tbody_tr:last-child_td:last-child]:rounded-br-lg",
      xl: "rounded-xl [&_thead_tr:first-child_th:first-child]:rounded-tl-xl [&_thead_tr:first-child_th:last-child]:rounded-tr-xl [&_tbody_tr:last-child_td:first-child]:rounded-bl-xl [&_tbody_tr:last-child_td:last-child]:rounded-br-xl",
    },
    size: {
      default: "[&_th]:p-4 [&_td]:px-4 [&_td]:py-3",
      sm: "[&_th]:p-2 [&_td]:p-2 text-xs",
      lg: "[&_th]:p-6 [&_td]:p-6",
    },
  },
  defaultVariants: {
    variant: "default",
    radius: "lg",
    size: "default",
  },
})

export interface TableProps 
  extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {}

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-gray-50 dark:bg-gray-900 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/50 data-[state=selected]:bg-gray-100 dark:data-[state=selected]:bg-gray-800",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-gray-600 dark:text-gray-300 [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-gray-500 dark:text-gray-400", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
