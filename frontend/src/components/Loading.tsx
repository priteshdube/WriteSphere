

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Spinner */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 border-opacity-80 mb-4"></div>

      {/* Loading Text */}
      <p className="text-lg font-medium text-gray-700">Loading, please wait...</p>
    </div>
  );
};

export default Loading;
