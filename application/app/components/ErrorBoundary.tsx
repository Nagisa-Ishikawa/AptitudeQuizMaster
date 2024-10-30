import React, { Component, ReactNode } from "react";
import { Notification } from "./Notification";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, errorMessage: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Caught by ErrorBoundary:", error, errorInfo);
  }

  handleClearError = () => {
    this.setState({ hasError: false, errorMessage: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Notification
          title="Error"
          mode="error"
          onClose={this.handleClearError}
        >
          {this.state.errorMessage}
        </Notification>
      );
    }

    return this.props.children;
  }
}