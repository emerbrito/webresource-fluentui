import { useEffect } from 'react';
import './App.css'
import { AppToolbar } from './components/AppToolbar'
import { PageHeader } from './components/PageHeader'
import { getRequiredDataParameter } from './infrastructure/services/dataParameterService';
import { useGlobalStore } from './store/globalStore';

function App() {
  
  const setDataParameters = useGlobalStore((state) => state.setDataParameters);

  useEffect(() => {

    if (import.meta.env.MODE !== "development") {
      const data = getRequiredDataParameter();
      console.log("Query param data:", data);
      setDataParameters(data);
    } else {
      console.log("Skipping data parameter parsing in development mode.");
    }    
    
  }, [setDataParameters]);  

  return (
    <>
      <nav className='container-card'>
        <AppToolbar />
      </nav>    

      <header className='container-card sm:p-2 lg:pl-5'>
        <PageHeader title='User Dashboard' />
      </header>         

      <main className="container-card grow overflow-y-auto sm:p-2 lg:pl-5">
        content here     
      </main>
    </>
  )
}

export default App
