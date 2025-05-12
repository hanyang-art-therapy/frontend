// WHILE IN PROGRESS

import { cn } from '@/lib/utils';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default function MyCommentPagination() {
  return (
    <Pagination className='mt-10'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              'border',
              'pointer-events-none border-none opacity-50'
            )}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href='#'>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext href='#' />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
