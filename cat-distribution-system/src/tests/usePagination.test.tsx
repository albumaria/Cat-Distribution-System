import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import usePagination from '../pages/main_page/functionalities/usePagination';

describe('usePagination hook', () => {
    const mockData = [
        { id: 1, name: 'Cat 1' },
        { id: 2, name: 'Cat 2' },
        { id: 3, name: 'Cat 3' },
        { id: 4, name: 'Cat 4' },
        { id: 5, name: 'Cat 5' },
        { id: 6, name: 'Cat 6' },
        { id: 7, name: 'Cat 7' },
        { id: 8, name: 'Cat 8' },
        { id: 9, name: 'Cat 9' },
        { id: 10, name: 'Cat 10' }
    ];

    it('initializes with default page size and first page', () => {
        const { result } = renderHook(() => usePagination(mockData));

        expect(result.current.currentPage).toBe(1);
        expect(result.current.pageSize).toBe(9);
        expect(result.current.totalPages).toBe(2);
        expect(result.current.paginatedData.length).toBe(9);
    });

    it('initializes with custom page size', () => {
        const { result } = renderHook(() => usePagination(mockData, 5));

        expect(result.current.currentPage).toBe(1);
        expect(result.current.pageSize).toBe(5);
        expect(result.current.totalPages).toBe(2);
        expect(result.current.paginatedData.length).toBe(5);
    });

    it('changes page correctly', () => {
        const { result } = renderHook(() => usePagination(mockData));

        // Move to second page
        act(() => {
            result.current.handlePageChange(2);
        });

        expect(result.current.currentPage).toBe(2);
        expect(result.current.paginatedData.length).toBe(1);
        expect(result.current.paginatedData[0].id).toBe(10);
    });

    it('prevents page change outside valid range', () => {
        const { result } = renderHook(() => usePagination(mockData));

        // cannot go to page 0
        act(() => {
            result.current.handlePageChange(0);
        });
        expect(result.current.currentPage).toBe(1);

        // page 3 is too large
        act(() => {
            result.current.handlePageChange(3);
        });
        expect(result.current.currentPage).toBe(1);
    });

    it('changes page size correctly', () => {
        const { result } = renderHook(() => usePagination(mockData));

        act(() => {
            result.current.handlePageSizeChange(5);
        });

        expect(result.current.pageSize).toBe(5);
        expect(result.current.currentPage).toBe(1);
        expect(result.current.totalPages).toBe(2);
        expect(result.current.paginatedData.length).toBe(5);
    });

    it('handles empty data array', () => {
        const { result } = renderHook(() => usePagination([]));

        expect(result.current.currentPage).toBe(1);
        expect(result.current.pageSize).toBe(9);
        expect(result.current.totalPages).toBe(0);
        expect(result.current.paginatedData.length).toBe(0);
    });

    it('handles data with less items than page size', () => {
        const smallData = [
            { id: 1, name: 'Cat 1' },
            { id: 2, name: 'Cat 2' }
        ];

        const { result } = renderHook(() => usePagination(smallData));

        expect(result.current.currentPage).toBe(1);
        expect(result.current.pageSize).toBe(9);
        expect(result.current.totalPages).toBe(1);
        expect(result.current.paginatedData.length).toBe(2);
    });

    it('calculates total pages correctly with different page sizes', () => {
        const testCases = [
            { pageSize: 3, expectedTotalPages: 4 },
            { pageSize: 5, expectedTotalPages: 2 },
            { pageSize: 10, expectedTotalPages: 1 }
        ];

        testCases.forEach(({ pageSize, expectedTotalPages }) => {
            const { result } = renderHook(() => usePagination(mockData, pageSize));

            expect(result.current.totalPages).toBe(expectedTotalPages);
        });
    });
});