import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  errorMessage: string;
};

export class AppErrorBoundary extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: ''
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error.message
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('UI runtime error:', error, errorInfo);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
          <div className="w-full max-w-xl rounded-xl border border-rose-200 bg-white p-6">
            <h1 className="text-lg font-semibold text-rose-700">Something went wrong on this page</h1>
            <p className="mt-2 text-sm text-slate-700">Please refresh. If it continues, share this message:</p>
            <pre className="mt-3 overflow-auto rounded-md bg-slate-100 p-3 text-xs text-slate-800">{this.state.errorMessage}</pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
