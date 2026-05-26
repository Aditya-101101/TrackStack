import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">

      <div className="text-center max-w-lg">

        <h1 className="text-8xl font-extrabold text-gray-900">
          404
        </h1>


        <h2 className="text-3xl font-bold text-gray-800 mt-4">
          Page Not Found
        </h2>


        <p className="text-gray-500 mt-4 leading-relaxed">
          The page you are looking for does not exist
          or may have been moved.
        </p>


        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">

          <Link
            to="/dashboard"
            className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Go To Dashboard
          </Link>

          <Link
            to="/"
            className="border border-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition"
          >
            Home
          </Link>

        </div>

      </div>

    </div>
  );
};

export default NotFound;