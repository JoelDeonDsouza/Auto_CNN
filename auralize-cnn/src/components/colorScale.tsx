const ColorScale = ({
  width = 200,
  height = 16,
  min = -1,
  mx = 1,
}: {
  width?: number;
  height?: number;
  min?: number;
  mx?: number;
}) => {
  const gradient =
    "linear-gradient(to right, rgb(225, 128, 51), rgb(255, 255, 255), rgb(51, 128, 255))";
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-stone-500">{min}</span>
      <div
        className="rounded border border-stone-500"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          background: gradient,
        }}
      />
      <span className="text-xs text-stone-500">{mx}</span>
    </div>
  );
};

export default ColorScale;
