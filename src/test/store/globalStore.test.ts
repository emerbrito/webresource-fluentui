import { describe, it, expect, beforeEach } from 'vitest';
import { useGlobalStore } from '../../store/globalStore';
import { DataParameters } from '../../models/DataParameters';

describe('Global Zustand Store', () => {
    beforeEach(() => {
        useGlobalStore.setState({ dataParameters: null });
    });

    it('should have initial state with dataParameters as null', () => {
        const state = useGlobalStore.getState();
        expect(state.dataParameters).toBeNull();
    });

    it('should update dataParameters when setDataParameters is called', () => {
        const mockData: DataParameters = { 'test': 'test' };

        const setDataParameters = useGlobalStore.getState().setDataParameters;
        setDataParameters(mockData);

        const state = useGlobalStore.getState();
        expect(state.dataParameters).toEqual(mockData);
    });

    it('should retain updated state across calls', () => {
        const data1: DataParameters = { 'test': 'test' };
        const data2: DataParameters = { 'test2': 'test2' };

        const setDataParameters = useGlobalStore.getState().setDataParameters;
        setDataParameters(data1);
        expect(useGlobalStore.getState().dataParameters).toEqual(data1);

        setDataParameters(data2);
        expect(useGlobalStore.getState().dataParameters).toEqual(data2);
    });
});