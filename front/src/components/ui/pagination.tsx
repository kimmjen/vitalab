import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  pageCount: number;
  page: number;
  perPage?: number;
  siblingCount?: number;
  baseUrl?: string;
  createUrl?: (page: number) => string;
  onPageChange?: (page: number) => void;
}

export function Pagination({
  pageCount,
  page,
  perPage = 10,
  siblingCount = 1,
  baseUrl = "",
  createUrl,
  onPageChange,
  className,
  ...props
}: PaginationProps) {
  // Defaults to using baseUrl if createUrl is not provided
  const getPageUrl = createUrl ?? ((page: number) => `${baseUrl}?page=${page}`);
  
  // Determine which pages to show in pagination
  const getPageNumbers = () => {
    const totalPageNumbers = siblingCount + 5; // Include first, last, current, next, prev
    
    // If totalPageNumbers >= pageCount, return all pages
    if (totalPageNumbers >= pageCount) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }
    
    // Calculate left and right sibling index
    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(page + siblingCount, pageCount);
    
    // Should show dots
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < pageCount - 2;
    
    // Case: show right dots
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "dots", pageCount];
    }
    
    // Case: show left dots
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => pageCount - rightItemCount + i + 1
      );
      return [1, "dots", ...rightRange];
    }
    
    // Case: show both dots
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [1, "dots", ...middleRange, "dots", pageCount];
    }
    
    return [];
  };
  
  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage === page) return;
    onPageChange?.(newPage);
  };
  
  const pages = getPageNumbers();
  
  // Early return if only one page
  if (pageCount <= 1) return null;
  
  return (
    <nav 
      className={cn("flex justify-center", className)} 
      aria-label="Pagination"
      {...props}
    >
      <ul className="flex flex-wrap items-center gap-1 md:gap-2">
        {/* Previous button */}
        <PaginationLink
          isDisabled={page <= 1}
          href={page > 1 ? getPageUrl(page - 1) : "#"} 
          onClick={(e) => {
            if (page <= 1) {
              e.preventDefault();
              return;
            }
            
            if (onPageChange) {
              e.preventDefault();
              handlePageChange(page - 1);
            }
          }}
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </PaginationLink>
        
        {/* Page numbers */}
        {pages.map((pageNum, i) => {
          // Dots indicator
          if (pageNum === "dots") {
            return (
              <li key={`dots-${i}`} className="flex items-center justify-center">
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </li>
            );
          }
          
          // Page number
          return (
            <PaginationLink
              key={`page-${pageNum}`}
              href={getPageUrl(pageNum as number)}
              isActive={pageNum === page}
              onClick={(e) => {
                if (onPageChange) {
                  e.preventDefault();
                  handlePageChange(pageNum as number);
                }
              }}
            >
              {pageNum}
            </PaginationLink>
          );
        })}
        
        {/* Next button */}
        <PaginationLink
          isDisabled={page >= pageCount}
          href={page < pageCount ? getPageUrl(page + 1) : "#"} 
          onClick={(e) => {
            if (page >= pageCount) {
              e.preventDefault();
              return;
            }
            
            if (onPageChange) {
              e.preventDefault();
              handlePageChange(page + 1);
            }
          }}
          aria-label="Go to next page"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </PaginationLink>
      </ul>
    </nav>
  );
}

interface PaginationLinkProps {
  href: string;
  isActive?: boolean;
  isDisabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  children: React.ReactNode;
  [key: string]: any;
}

function PaginationLink({
  href,
  children,
  isActive,
  isDisabled,
  className,
  onClick,
  ...props
}: PaginationLinkProps) {
  if (isDisabled) {
    return (
      <div
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "cursor-not-allowed opacity-50",
          className
        )}
        aria-disabled="true"
      >
        {children}
      </div>
    );
  }
  
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({
          variant: isActive ? "default" : "outline",
          size: typeof children === "string" ? "default" : "icon",
        }),
        isActive && "pointer-events-none",
        className
      )}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
      {...props}
    >
      {children}
    </Link>
  );
} 