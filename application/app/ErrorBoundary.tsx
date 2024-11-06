import React from "react";
import { Notification } from "./components/Notification"; // Notificationコンポーネントのパスを確認

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Notification
          title="An error occurred"
          mode="error"
          onClose={() => this.setState({ hasError: false, error: null })}
        >
          {this.state.error?.message}
        </Notification>
      );
    }
    return this.props.children;
  }
  
}

export { ErrorBoundary };
