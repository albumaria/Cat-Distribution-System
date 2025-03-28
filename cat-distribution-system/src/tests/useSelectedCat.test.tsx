import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useSelectedCat from '../pages/main_page/functionalities/useSelectedCat';

describe('useSelectedCat hook', () => {
    const mockCat = {
        id: 1,
        name: 'Whiskers',
        age: 3,
        gender: 'M',
        description: 'A playful cat'
    };

    it('initializes with null selected cat', () => {
        const { result } = renderHook(() => useSelectedCat());

        expect(result.current.selectedCat).toBe(null);
    });

    it('selects a cat correctly', () => {
        const { result } = renderHook(() => useSelectedCat());

        act(() => {
            result.current.selectCat(mockCat);
        });

        expect(result.current.selectedCat).toEqual(mockCat);
    });

    it('can change selected cat multiple times', () => {
        const { result } = renderHook(() => useSelectedCat());

        const anotherCat = {
            id: 2,
            name: 'Mittens',
            age: 5,
            gender: 'F',
            description: 'A calm cat'
        };

        // First selection
        act(() => {
            result.current.selectCat(mockCat);
        });

        expect(result.current.selectedCat).toEqual(mockCat);

        // Second selection
        act(() => {
            result.current.selectCat(anotherCat);
        });

        expect(result.current.selectedCat).toEqual(anotherCat);
    });

    it('can deselect a cat by passing null', () => {
        const { result } = renderHook(() => useSelectedCat());

        // Select a cat
        act(() => {
            result.current.selectCat(mockCat);
        });

        expect(result.current.selectedCat).toEqual(mockCat);

        // Deselect
        act(() => {
            result.current.selectCat(null);
        });

        expect(result.current.selectedCat).toBe(null);
    });
});