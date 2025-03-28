import '@testing-library/jest-dom/vitest';
import { describe, expect, it, vi } from 'vitest';
import {renderHook} from '@testing-library/react';
import useCatData from '../pages/main_page/functionalities/useCatData';
import CatEntities from '../assets/CatEntities';
import {act} from "react";

vi.mock('uuid', () => ({
    v4: () => 'test-uuid'
}));

describe('useCatData hook', () => {
    it('initializes with default cat entities', () => {
        const { result } = renderHook(() => useCatData());

        expect(result.current.catEntities).toEqual(CatEntities);
        expect(result.current.sortConfig).toEqual({
            key: null,
            direction: 'none'
        });
    });

    it('deletes a cat from entities', () => {
        const { result } = renderHook(() => useCatData());
        const catToDelete = CatEntities[0];

        act(() => {
            result.current.deleteCat(catToDelete);
        });

        expect(result.current.catEntities).toHaveLength(CatEntities.length - 1);
        expect(result.current.catEntities).not.toContain(catToDelete);
    });

    it('does nothing when deleting null cat', () => {
        const { result } = renderHook(() => useCatData());
        const initialEntities = result.current.catEntities;

        act(() => {
            result.current.deleteCat(null);
        });

        expect(result.current.catEntities).toEqual(initialEntities);
    });

    it('adds a new cat with generated UUID', () => {
        const { result } = renderHook(() => useCatData());
        const newCat = {
            name: 'New Test Cat',
            breed: 'Test Breed',
            age: 3
        };

        act(() => {
            result.current.addCat(newCat);
        });

        expect(result.current.catEntities).toHaveLength(CatEntities.length + 1);
        const addedCat = result.current.catEntities.find(cat => cat.name === 'New Test Cat');
        expect(addedCat).toBeTruthy();
        expect(addedCat.id).toBe('test-uuid');
    });

    it('updates an existing cat', () => {
        const { result } = renderHook(() => useCatData());
        const catToUpdate = CatEntities[0];
        const updatedCat = {
            ...catToUpdate,
            name: 'Updated Cat Name',
            age: 10
        };

        act(() => {
            result.current.updateCat(catToUpdate, updatedCat);
        });

        const foundCat = result.current.catEntities.find(cat => cat.id === catToUpdate.id);
        expect(foundCat.name).toBe('Updated Cat Name');
        expect(foundCat.age).toBe(10);
    });

    it('sorts entities in ascending order', () => {
        const { result } = renderHook(() => useCatData());

        act(() => {
            result.current.setSorting({
                key: 'age',
                direction: 'ascending'
            });
        });

        const sortedAges = result.current.catEntities.map(cat => cat.age);
        const expectedSortedAges = [...CatEntities].sort((a, b) => a.age - b.age).map(cat => cat.age);
        expect(sortedAges).toEqual(expectedSortedAges);
    });

    it('sorts entities in descending order', () => {
        const { result } = renderHook(() => useCatData());

        act(() => {
            result.current.setSorting({
                key: 'age',
                direction: 'descending'
            });
        });

        const sortedAges = result.current.catEntities.map(cat => cat.age);
        const expectedSortedAges = [...CatEntities].sort((a, b) => b.age - a.age).map(cat => cat.age);
        expect(sortedAges).toEqual(expectedSortedAges);
    });

    it('resets sorting when direction is none', () => {
        const { result } = renderHook(() => useCatData());
        const originalEntities = [...CatEntities];

        act(() => {
            result.current.setSorting({
                key: null,
                direction: 'none'
            });
        });

        expect(result.current.catEntities).toEqual(originalEntities);
    });
});