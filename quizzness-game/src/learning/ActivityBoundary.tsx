import { Component, type ReactNode } from "react";
export class ActivityBoundary extends Component<
  { children: ReactNode; replacement?: ReactNode },
  { failed: boolean; replacement: boolean; retry: number }
> {
  state = { failed: false, replacement: false, retry: 0 };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed)
      return (
        <section role="alert">
          <h2>This activity could not open</h2>
          <p>
            Your progress has not been marked complete and no attempt was spent.
          </p>
          <button
            onClick={() =>
              this.setState({
                failed: false,
                replacement: false,
                retry: this.state.retry + 1,
              })
            }
          >
            Retry activity loading
          </button>
          {this.props.replacement && !this.state.replacement && (
            <button
              onClick={() =>
                this.setState({ failed: false, replacement: true })
              }
            >
              Use reviewed replacement for the same objective
            </button>
          )}
        </section>
      );
    return (
      <div key={this.state.retry}>
        {this.state.replacement ? (
          <>
            <p>Reviewed replacement · same learning objective</p>
            {this.props.replacement}
          </>
        ) : (
          this.props.children
        )}
      </div>
    );
  }
}
