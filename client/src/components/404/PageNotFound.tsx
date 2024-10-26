
const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="text-2xl font-semibold text-gray-600 mt-4">Oops! Page Not Found</p>
      <p className="text-lg text-gray-500 mt-2">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <p className="text-lg text-gray-500 mt-2">
        You can try returning to the home page using the button below.
      </p>
      <a
        href="/"
        className="mt-6 inline-block px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition duration-300"
      >
        Go to Home
      </a>
      <p className="text-sm text-gray-400 mt-4">If you believe this is an error, please contact support.</p>
    </div>
  );
};

export default PageNotFound;
