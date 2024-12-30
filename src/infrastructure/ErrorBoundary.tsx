import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode; // Optional custom fallback UI or component
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You can log the error to an external service here
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      if (fallback) {
        if (React.isValidElement(fallback)) {
          // Ensure the fallback is typed to accept error and errorInfo props
          return React.cloneElement(fallback as React.ReactElement<any>, { error, errorInfo });
        }
        else {
          return fallback;
        }
      }

      // Default fallback UI if no custom fallback is provided
      return (
        <>
          {error && error.message ? (error.message) : ("An unexpected error has occurred.")}
        </>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
