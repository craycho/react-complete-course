import { Component } from "react";

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }
  componentDidCatch(error) {
    console.log(error);
    this.setState({ hasError: true });
  }
  // Ovaj lifecycle method automatski ucini component Error Boundaryem

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong!</p>;
    }

    return this.props.children; // props.children jer wrapamo druge components u ovu
  }
}

export default ErrorBoundary;
