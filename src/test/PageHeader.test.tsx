import { render, screen } from '@testing-library/react'
import { PageHeader } from '../components/PageHeader'

describe('PageHeader Component', () => {
  test('renders without crashing', () => {
    render(<PageHeader title='Test Title' />)
    // Check if the component is in the document
    const headerElement = screen.getByText(/Test Title/i)
    expect(headerElement).toBeInTheDocument()
  })

  test('renders with correct title', () => {
    const testTitle = 'My Page Title'
    render(<PageHeader title={testTitle} />)
    // Check if the title is displayed correctly
    const titleElement = screen.getByText(testTitle)
    expect(titleElement).toBeInTheDocument()
  })
})
