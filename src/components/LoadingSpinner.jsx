import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-base-100">
      <div className="flex flex-col items-center gap-3">
        <FaSpinner className="text-primary text-5xl animate-spin" />
        <p className="text-base-content text-lg font-medium tracking-wide">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
