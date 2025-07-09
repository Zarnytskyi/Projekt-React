import { Route, Routes } from "react-router-dom"
import './style-reset/App.css'
import MainPage from "./pages/MainPage/MainPage"
import Cart from "./pages/Cart/Cart"
import AllSales from "./pages/AllSales/AllSales"
import Category from "./pages/Categories/Category"
import AllProducts from "./pages/AllProducts/AllProducts"
import MainLayout from "./layouts/MainLayout"
import Discount from "./pages/Discount/Discount"

function App() {
  return (
      <Routes>
        <Route path="/" element={<MainLayout/>}>
        <Route index element={<MainPage/>}/>
        <Route path="allSales" element={<AllSales/>}/>
        <Route path="category" element={<Category/>}/>
        <Route path="allProducts" element={<AllProducts/>}/>
        <Route path="cart" element={<Cart/>}/>
        <Route path="discount" element={<Discount/>}/>
        </Route>
      </Routes>
  )
}

export default App
