import React from "react";

interface AppErrorProps {
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export const AppError: React.FC<AppErrorProps> = ({ error, errorInfo }) => {
   
    return(
        <section className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <div className="bg-white border border-gray-300 shadow-md rounded-lg p-6 max-w-md w-full">
                <h1 className="mb-4 text-xl font-bold text-gray-800">Unexpected Error</h1>
                <p className="mb-4 text-gray-600">
                An unexpected error has occurred. Please try again. If the error persists, copy the information below and contact your system administrator.
                </p>
                {error && <p className="text-red-500 mb-4">{error.message}</p>}
                {errorInfo && (
                <details className="mt-4 text-sm text-gray-700 dark:text-gray-300" style={{ whiteSpace: "pre-wrap" }}>
                    <summary className="cursor-pointer underline">Details</summary>
                    {errorInfo.componentStack}
                </details>
                )}
            </div>
        </section>
    )

}

export default AppError;

