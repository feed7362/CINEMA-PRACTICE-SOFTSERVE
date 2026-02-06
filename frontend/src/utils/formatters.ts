export const HALL_FORMAT_MAP: Record<string, { label: string; id: number }> = {
    'REGULAR': { label: '2D', id: 0 },
    'IMAX':    { label: 'IMAX', id: 1 },
    '_3D':     { label: '3D', id: 2 },
};

export const formatHallFormat = (format: string | undefined | null): string => {
    if (!format) return "2D";
    const cleanFormat = format.toUpperCase();
    return HALL_FORMAT_MAP[cleanFormat]?.label || cleanFormat;
};

export const getFormatId = (formatStr: string | undefined): number => {
    if (!formatStr) return 0;
    return HALL_FORMAT_MAP[formatStr.toUpperCase()]?.id ?? 0;
};