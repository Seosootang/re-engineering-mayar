import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
    showPrevNext?: boolean;
    maxVisiblePages?: number;
}

export default function Pagination({
    currentPage = 1,
    totalPages = 8,
    onPageChange = () => {},
    showPrevNext = true,
    maxVisiblePages = 5
}: PaginationProps) {
    const getVisiblePages = () => {
        const pages = [];
        const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        // Add first page and ellipsis if needed
        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) {
                pages.push('...');
            }
        }

        // Add visible pages
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Add ellipsis and last page if needed
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push('...');
            }
            pages.push(totalPages);
        }

        return pages;
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page: number) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="flex items-center justify-center gap-2 py-8">
            {showPrevNext && (
                <button 
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-1"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Prev
                </button>
            )}

            {visiblePages.map((page, index) => {
                if (page === '...') {
                    return (
                        <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500 dark:text-gray-400">
                            ...
                        </span>
                    );
                }

                const pageNumber = page as number;
                const isActive = pageNumber === currentPage;

                return (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageClick(pageNumber)}
                        className={`px-3 py-2 rounded transition-colors duration-200 ${
                            isActive
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                    >
                        {pageNumber}
                    </button>
                );
            })}

            {showPrevNext && (
                <button 
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-1"
                >
                    Next
                    <ChevronRight className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}