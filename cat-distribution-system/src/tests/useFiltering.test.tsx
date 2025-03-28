import { it, expect, describe } from "vitest";
import {renderHook} from '@testing-library/react';
import useFiltering from '../pages/main_page/functionalities/useFiltering';
import {act} from "react";

describe('useFiltering hook', () => {
    const mockData = [
        { name: 'Whiskers', age: 2 },
        { name: 'Mittens', age: 5 },
        { name: 'Snowball', age: 1 },
        { name: 'Tiger', age: 3 }
    ];

    it('initializes with empty search term and no age filter', () => {
        const { result } = renderHook(() => useFiltering(mockData));

        expect(result.current.searchTerm).toBe("");
        expect(result.current.filteredEntities).toEqual(mockData);
    });

    it('filters by search term', () => {
        const { result } = renderHook(() => useFiltering(mockData));

        act(() => {
            result.current.setSearchTerm('mitt');
        });

        expect(result.current.filteredEntities).toEqual([
            { name: 'Mittens', age: 5 }
        ]);
    });

    it('filters by age range', () => {
        const { result } = renderHook(() => useFiltering(mockData));

        act(() => {
            result.current.filterByAge(2, 4);
        });

        expect(result.current.filteredEntities).toEqual([
            { name: 'Whiskers', age: 2 },
            { name: 'Tiger', age: 3 }
        ]);
    });

    it('combines search term and age filter', () => {
        const { result } = renderHook(() => useFiltering(mockData));

        act(() => {
            result.current.setSearchTerm('w');
            result.current.filterByAge(1, 3);
        });

        expect(result.current.filteredEntities).toEqual([
            { name: 'Whiskers', age: 2 },
            { name: 'Snowball', age: 1}
        ]);
    });

    it('resets age filter when min and max are null', () => {
        const { result } = renderHook(() => useFiltering(mockData));

        act(() => {
            result.current.filterByAge(2, 4);
        });

        expect(result.current.filteredEntities).toEqual([
            { name: 'Whiskers', age: 2 },
            { name: 'Tiger', age: 3 }
        ]);

        act(() => {
            result.current.filterByAge(null, null);
        });

        expect(result.current.filteredEntities).toEqual(mockData);
    });

    it('handles case-insensitive search', () => {
        const { result } = renderHook(() => useFiltering(mockData));

        act(() => {
            result.current.setSearchTerm('MITT');
        });

        expect(result.current.filteredEntities).toEqual([
            { name: 'Mittens', age: 5 }
        ]);
    });

    it('returns empty array when no matches found', () => {
        const { result } = renderHook(() => useFiltering(mockData));

        act(() => {
            result.current.setSearchTerm('xyz');
            result.current.filterByAge(10, 15);
        });

        expect(result.current.filteredEntities).toEqual([]);
    });
});