import { useState, useEffect, useMemo, useCallback } from 'react';
import { statsApi } from '@/api/statsApi';
import { hallApi } from '@/api/hallApi';
import type { HeatmapSeat } from '@/types/admin';
import type { Hall } from '@/types/hall';

export const useHallHeatmap = () => {
    const [halls, setHalls] = useState<Hall[]>([]);
    const [selectedHallId, setSelectedHallId] = useState<number | string>('');
    const [heatmapData, setHeatmapData] = useState<HeatmapSeat[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadHalls = async () => {
            try {
                const data = await hallApi.getAllHalls();
                setHalls(data);
                if (data.length > 0) {
                    setSelectedHallId(data[0].id);
                }
            } catch (e) {
                console.error(e);
            }
        };
        loadHalls();
    }, []);

    useEffect(() => {
        if (!selectedHallId) return;

        const loadHeatmap = async () => {
            setIsLoading(true);
            try {
                const data = await statsApi.getHallHeatmap(Number(selectedHallId));
                setHeatmapData(data);
            } catch (e) {
                setHeatmapData([]);
            } finally {
                setIsLoading(false);
            }
        };
        loadHeatmap();
    }, [selectedHallId]);

    const selectedHall = useMemo(() => 
        halls.find(h => h.id === Number(selectedHallId)), 
    [halls, selectedHallId]);

    const gridMap = useMemo(() => {
        if (!selectedHall || !selectedHall.seatMap || selectedHall.seatMap.length === 0) {
            return Array(10).fill('a'.repeat(12));
        }
        return selectedHall.seatMap;
    }, [selectedHall]);

    const getSeatStats = useCallback((r: number, c: number) => {
        const rowNumber = r + 1;
        const colNumber = c + 1;
        
        const rowString = gridMap[r];
        if (!rowString || !rowString[c] || rowString[c] === ' ') {
            return { exists: false, purchaseCount: 0, color: null };
        }

        const stat = heatmapData.find(s => s.row === rowNumber && s.number === colNumber);
        return { 
            exists: true, 
            purchaseCount: stat?.purchaseCount || 0, 
            color: stat?.color || null 
        };
    }, [gridMap, heatmapData]);

    return {
        halls,
        selectedHallId,
        setSelectedHallId,
        isLoading,
        gridMap,
        getSeatStats
    };
};