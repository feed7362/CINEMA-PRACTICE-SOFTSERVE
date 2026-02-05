export const formatHallFormat = (format: string | undefined | null): string => {
    if (!format) return "2D";

    const formatMap: Record<string, string> = {
        '_3D': '3D',
        'IMAX': 'IMAX',
        'REGULAR': '2D',
        'VIP': 'VIP'
    };

    const cleanFormat = format.toUpperCase();

    return formatMap[cleanFormat] || cleanFormat;
};

export const formatSessionInfo = (startTime: string, rawFormat: string) => {
    const date = new Date(startTime);

    const time = date.toLocaleTimeString('uk-UA', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const formatMap: Record<string, string> = {
        '_3D': '3D',
        '_12PLUS': '12+',
        'REGULAR': '2D'
    };

    const cleanFormat = formatMap[rawFormat.toUpperCase()] || rawFormat;

    return {time, cleanFormat};
};