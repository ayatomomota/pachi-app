export default function Loading() {
  return (
    <div className="flex justify-center items-center py-10">
      <div
        className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"
        role="status"
        aria-label="読み込み中"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
