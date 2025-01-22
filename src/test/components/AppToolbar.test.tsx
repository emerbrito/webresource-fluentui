import { fireEvent, render, screen, setup } from '../../utils/test-utils'
import { AppToolbar } from '../../components/AppToolbar'

describe('AppToolbar Component', () => {
  test('renders without crashing', () => {
    setup(<AppToolbar />)
    // Check if the toolbar is in the document
    const toolbarElement = screen.getByRole('toolbar')
    expect(toolbarElement).toBeInTheDocument()
  })

  test('renders all toolbar buttons', () => {
    setup(<AppToolbar />)
    // Check for the presence of all buttons
    expect(screen.getByLabelText('Go back')).toBeInTheDocument()
    expect(screen.getByLabelText('Add new record')).toBeInTheDocument()
    expect(screen.getByLabelText('Save record')).toBeInTheDocument()
    expect(screen.getByLabelText('Save and close')).toBeInTheDocument()
    expect(screen.getByLabelText('Delete record')).toBeInTheDocument()
    expect(screen.getByLabelText('More')).toBeInTheDocument()
  })

  test('button labels are correct', () => {
    setup(<AppToolbar />)
    // Check button labels
    expect(screen.getByLabelText('Add new record')).toHaveTextContent('Add New')
    expect(screen.getByLabelText('Save record')).toHaveTextContent('Save')
    expect(screen.getByLabelText('Save and close')).toHaveTextContent('Save & Close')
    expect(screen.getByLabelText('Delete record')).toHaveTextContent('Delete')
  })

  test('click more button', async () => {
    const { user } = setup(<AppToolbar />)
    expect(screen.queryByText('New')).not.toBeInTheDocument()
    const moreButton = screen.getByLabelText('More')
    await user.click(moreButton)
    expect(screen.getByText('New')).toBeInTheDocument()
    expect(screen.getByText('New Window')).toBeInTheDocument()
    expect(screen.getByText('Open Folder')).toBeInTheDocument()
    expect(screen.getByText('Open File')).toBeInTheDocument()
  })
})
