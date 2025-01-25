"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { cn } from "@/lib/utils";

export default function TablePagination({
  page,
  count,
}: {
  page: number;
  count: number;
}) {
  const numOfPages = Math.ceil(count / ITEM_PER_PAGE);

  const url = (page: number): string => {
    if (typeof window === "undefined") return "#";

    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    return url.toString();
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={url(page - 1)}
            aria-disabled={page <= 1}
            className={cn(
              page <= 1 ? "pointer-events-none opacity-50" : undefined
            )}
          />
        </PaginationItem>
        {Array.from({ length: numOfPages }, (_, index) => {
          return (
            <>
              <PaginationItem>
                <PaginationLink
                  href={`/list/teachers?page=${index + 1}`}
                  isActive={page === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            </>
          );
        })}
        <PaginationItem>
          <PaginationNext
            href={url(page + 1)}
            aria-disabled={page == numOfPages}
            className={cn(
              page == numOfPages ? "pointer-events-none opacity-50" : undefined
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
