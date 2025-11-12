import { Link } from "react-router";
import { FaHome, FaUserFriends } from "react-icons/fa";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center p-6">
      <div className="card bg-base-100 shadow-xl p-10 max-w-md">
        <h1 className="text-7xl font-extrabold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-6">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="flex flex-col gap-3">
          <Link to="/" className="btn btn-primary w-full flex items-center justify-center gap-2">
            <FaHome className="w-4 h-4" /> Back to Home
          </Link>
          <Link to="/find-partners" className="btn btn-outline w-full flex items-center justify-center gap-2">
            <FaUserFriends className="w-4 h-4" /> Browse Study Partners
          </Link>
        </div>
      </div>

      <div className="mt-10 text-sm text-gray-400">
        <p>Need help? Contact our support or try searching again.</p>
      </div>
    </div>
  );
}
