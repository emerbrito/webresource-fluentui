import React from 'react'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'

const setup = (jsx: React.ReactNode) => ({
    user: userEvent.setup(),
    ...render(jsx)
})

export * from '@testing-library/react'
export { setup }
