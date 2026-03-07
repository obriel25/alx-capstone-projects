export function Loader({ size = "md", message }) {
  const sizes = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };

  const spinnerSize = sizes[size] || sizes.md; // fallback if invalid size

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600 ${spinnerSize}`}
      ></div>

      {message && (
        <p className="text-gray-600 dark:text-gray-300 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}