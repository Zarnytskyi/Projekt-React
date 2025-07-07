import React from 'react'
import styles from './Header.module.css'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../ui/logo.png'
import basket from '../../ui/basket=empty.png'
import { useSelector } from 'react-redux'



const Header = () => {
  const quantity = useSelector(state => state.cart.quantity);
  return (
    <div className={styles.container}>
        <Link to='/'><img src={logo}/></Link>
        <div className={styles.navbar}>
        <NavLink to="/">Main Page</NavLink>
        <NavLink to="/category">Category</NavLink>
        <NavLink to="/allProducts">All products</NavLink>
        <NavLink to="/allSales">All Sales</NavLink>
        </div>
        <div>
            <Link to="cart" style={{ position: 'relative', display: 'inline-block' }}>
  <img src={basket} alt="cart" />
  {quantity > 0 && (
    <span className={styles.cart_badge}>
      {quantity > 99 ? '99+' : quantity}
    </span>
  )}
</Link>
        </div>
    </div>
  )
}

export default Header