import { setup, screen } from '../../utils/test-utils'
import { AppError } from '../../infrastructure/AppError'

describe('AppError Component', () => {
  test('renders without crashing', () => {
    setup(<AppError />)
    expect(screen.getByText('Unexpected Error')).toBeInTheDocument()
    expect(
      screen.getByText(
        'An unexpected error has occurred. Please try again. If the error persists, copy the information below and contact your system administrator.'
      )
    ).toBeInTheDocument()
  })

  test.only('displays error message when error prop is provided', () => {
    const errorMessage = 'Something went wrong!'
    setup(<AppError error={new Error(errorMessage)} />)

    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  test('displays error details when errorInfo prop is provided', () => {
    const errorInfo = {
      componentStack: 'at App\nat ErrorBoundary\nat Main'
    }
    setup(<AppError errorInfo={errorInfo} />)
    expect(screen.getByText('Details')).toBeInTheDocument()
    expect(screen.getByText(errorInfo.componentStack)).toBeInTheDocument()
  })

  test('does not display error details if errorInfo prop is not provided', () => {
    setup(<AppError />)
    expect(screen.queryByText('Details')).not.toBeInTheDocument()
  })

  test('displays messages when error and errorInfo props are provided', () => {
    const errorMessage = 'Something went wrong!'
    const errorInfo = {
      componentStack: 'at App\nat ErrorBoundary\nat Main'
    }
    setup(<AppError error={new Error(errorMessage)} errorInfo={errorInfo} />)

    expect(screen.getByText(errorMessage)).toBeInTheDocument()
    expect(screen.getByText(errorInfo.componentStack)).toBeInTheDocument()
  })
})
