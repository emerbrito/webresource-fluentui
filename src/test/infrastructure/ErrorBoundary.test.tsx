import { setup, screen } from '../../utils/test-utils'
import ErrorBoundary from '../../infrastructure/ErrorBoundary'

const ProblematicComponent = () => {
  throw new Error('Test error!')
}

describe('ErrorBoundary Component', () => {
  test('renders children without crashing', () => {
    setup(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    )
    expect(screen.getByText('Child Component')).toBeInTheDocument()
  })

  test('catches errors and displays fallback UI', () => {
    setup(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    )

    expect(screen.getByText('Test error!')).toBeInTheDocument()
  })

  test('displays errors with fallback UI', () => {
    const fallbackUI = <div>Fallback UI</div>
    setup(
      <ErrorBoundary fallback={fallbackUI}>
        <ProblematicComponent />
      </ErrorBoundary>
    )
    expect(screen.getByText('Fallback UI')).toBeInTheDocument()
  })

  test('displays default error message when no fallback is invalid', () => {
    const fallbackUI = 'Fallback UI'
    setup(
      <ErrorBoundary fallback={fallbackUI}>
        <ProblematicComponent />
      </ErrorBoundary>
    )
    expect(screen.getByText('Fallback UI')).toBeInTheDocument()
  })

  test('passes error and errorInfo to custom fallback', () => {
    const CustomFallback = ({ error, errorInfo }: { error: Error | null; errorInfo: React.ErrorInfo | null }) => (
      <div>
        <h1>Custom Error Fallback</h1>
        <p>{error?.message}</p>
        <pre>{errorInfo?.componentStack}</pre>
      </div>
    )

    setup(
      <ErrorBoundary fallback={<CustomFallback error={null} errorInfo={null} />}>
        <ProblematicComponent />
      </ErrorBoundary>
    )

    expect(screen.getByText('Custom Error Fallback')).toBeInTheDocument()
    expect(screen.getByText('Test error!')).toBeInTheDocument()
  })
})
