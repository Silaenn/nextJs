export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-180px)] flex items-center justify-center">
      <div className="text-center">
        <div className="spinner w-12 h-12 mx-auto mb-4"></div>
        <p className="text-textSoft">Loading...</p>
      </div>
    </div>
  );
}
