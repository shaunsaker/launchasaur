import React, { Component, ReactNode } from "react";
import { ErrorPage } from "./ErrorPage";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: string;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.onResetError = this.onResetError.bind(this);

    this.state = {
      error: "",
    };
  }

  componentDidCatch(error: Error) {
    this.setState({ error: error.message });
  }

  onResetError() {
    this.setState({ error: "" });
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorPage error={this.state.error} resetError={this.onResetError} />
      );
    }

    return this.props.children;
  }
}
