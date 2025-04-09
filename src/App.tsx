// src/App.tsx
import { lazy, Suspense } from 'react';
import './App.css'
import { AppToolbar } from './components/AppToolbar'
import { PageHeader } from './components/PageHeader'

// Use React.lazy for conditional imports
const DevAuth = import.meta.env.DEV 
  ? lazy(() => import('./components/auth/DevAuth'))
  : () => null;

const ProductionContent = lazy(() => import('./components/ProductionContent'));

function App() {
  return (
    <>
      <nav className='container-card'>
        <AppToolbar />
      </nav>    

      <header className='container-card sm:p-2 lg:pl-5'>
        <PageHeader title='User Dashboard' />
      </header>         

      <main className="container-card grow overflow-y-auto sm:p-2 lg:pl-5">
        <Suspense fallback={<div>Loading...</div>}>
          {import.meta.env.DEV ? <DevAuth /> : <ProductionContent />}
        </Suspense>
      </main>
    </>
  )
}

export default App