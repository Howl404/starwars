import { MdError } from 'react-icons/md';

export function DefaultErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <MdError className="text-6xl" />
      <p className="text-gray-600">{error.message}</p>
      <p className="text-gray-600">Please try to reload the page</p>
    </div>
  );
}
