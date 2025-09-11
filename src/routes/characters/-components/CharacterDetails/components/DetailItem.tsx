import type { DetailItemProps } from './DetailItem.types';

export function DetailItem({ icon, label, value, colorBox }: DetailItemProps) {
  return (
    <div className="flex items-center gap-3 rounded-md bg-gray-50 p-4 transition-colors hover:bg-gray-100">
      <span className="text-xl">{icon}</span>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900">{value}</span>
          {colorBox &&
            colorBox !== 'n/a' &&
            colorBox
              .split(',')
              .map((color) => (
                <div
                  key={color.trim()}
                  className="h-4 w-4 rounded-full border border-gray-200"
                  style={{ backgroundColor: color }}
                  title={`${label}: ${value}`}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
