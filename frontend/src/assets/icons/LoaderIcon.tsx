interface Props {
    size?: number;
    className?: string;
}

const LoaderIcon = ({ size = 24, className = '' }: Props) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={`animate-spin ${className}`}
    >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
);

export default LoaderIcon;
