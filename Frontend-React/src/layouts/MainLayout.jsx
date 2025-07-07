import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import './MainLayout.css'

const MainLayout = () => {
  return (
    <div className='app-layout'>
    <header>
      <Header />
    </header>
      <main>
        <Outlet /> 
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default MainLayout
