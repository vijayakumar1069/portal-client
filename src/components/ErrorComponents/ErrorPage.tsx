"use client";

import { AlertTriangle, RefreshCw, Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ErrorPageProps {
  title?: string;
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  title = "Something went wrong",
  message = "We encountered an unexpected error. Please try again.",
}) => {
  const router = useRouter();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
      {/* Error Icon */}
      <div className="mb-6">
        <div className="p-4 rounded-full bg-red-100 dark:bg-red-900/20">
          <AlertTriangle className="w-12 h-12 text-red-600 dark:text-red-400" />
        </div>
      </div>

      {/* Error Title */}
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
        {title}
      </h2>

      {/* Error Message */}
      <p className="text-base text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        {message}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 
                     text-white rounded-lg font-medium transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>

        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 
                     dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 
                     rounded-lg font-medium transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>

        <button
          onClick={handleGoHome}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 
                     dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 
                     text-gray-700 dark:text-gray-300 rounded-lg font-medium 
                     transition-colors duration-200 focus:outline-none focus:ring-2 
                     focus:ring-gray-500 focus:ring-offset-2"
        >
          <Home className="w-4 h-4" />
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;