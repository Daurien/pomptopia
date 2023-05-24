export default function Loading() {
  let sizes = [100, 150, 120, 200, 170];
  return (
    <div className="prompt_layout w-full md:w-auto">
      {sizes.map((h, i) => (
        <div
          className="flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-gray-300 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit animate-pulse"
          style={{ height: h, animationDelay: `${i * 0.15}s`, animationDuration: "1s" }}
        />
      ))}
    </div>
  );
}
