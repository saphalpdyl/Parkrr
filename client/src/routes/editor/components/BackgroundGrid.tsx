type BackgroundGridProps = {
  gridSize: number;
};

function BackgroundGrid({ gridSize }: BackgroundGridProps) {
  return (
    <div className="pointer-events-none absolute left-0 top-0 z-0 h-screen w-screen bg-[#f0f0f0]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="grid"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke="#6662"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}
export default BackgroundGrid;
