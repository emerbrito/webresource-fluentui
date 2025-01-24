import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setup, screen } from '../utils/test-utils'
import { useGlobalStore } from '../store/globalStore'
import useFetch from '../hooks/useFetch'
import App from '../App'
import { AxiosInstance } from 'axios'

// Mock the necessary dependencies
vi.mock('../store/globalStore', () => ({
  useGlobalStore: vi.fn()
}))

vi.mock('../hooks/useFetch', () => ({
  default: vi.fn()
}))

vi.mock('../components/AppToolbar', () => ({
  AppToolbar: () => <div>App Toolbar</div>
}))

vi.mock('../components/PageHeader', () => ({
  PageHeader: ({ title }: { title: string }) => <h1>{title}</h1>
}))

describe('App component', () => {
  let fetchInstanceMock: AxiosInstance

  beforeEach(() => {
    fetchInstanceMock = {
      get: vi.fn().mockResolvedValue({ data: { value: [] } })
    } as unknown as AxiosInstance
    ;(useGlobalStore as any).mockReturnValue({
      setDataParameters: vi.fn()
    })
    ;(useFetch as any).mockReturnValue(fetchInstanceMock)
  })

  it('renders AppToolbar and PageHeader components', () => {
    setup(<App />)

    expect(screen.getByText('App Toolbar')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'User Dashboard' })).toBeInTheDocument()
  })

  it('fetches data from API in production mode', async () => {
    setup(<App />)

    expect(fetchInstanceMock.get).toHaveBeenCalledWith(
      'https://tstest1.crm.dynamics.com/api/data/v9.2/accounts?$select=accountid,accountnumber,name&$top=5'
    )
  })

  it('does not set data parameters in development mode', () => {
    // Mock import.meta.env.MODE to be 'development'
    import.meta.env.MODE = 'development' // Set environment mode to development for test
    setup(<App />)

    const globalStore = useGlobalStore()
    expect(globalStore.setDataParameters).not.toHaveBeenCalled()
  })
})
