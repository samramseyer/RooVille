import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  onResetSave?: () => void
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('RooVille error:', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error-boundary">
          <h1>RooVille hit a snag</h1>
          <p>Something went wrong loading your town. Try refreshing once more.</p>
          <p className="error-boundary-detail">{this.state.error.message}</p>
          <div className="error-boundary-actions">
            <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>
              Refresh page
            </button>
            {this.props.onResetSave && (
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  this.props.onResetSave?.()
                  this.setState({ error: null })
                  window.location.reload()
                }}
              >
                Reset town &amp; start fresh
              </button>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
