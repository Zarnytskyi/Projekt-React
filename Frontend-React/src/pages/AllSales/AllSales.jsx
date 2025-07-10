import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styles from './Discount.module.css'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cartSlicer'

const AllSales = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [sortOrder, setSortOrder] = useState('default')

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchDiscountProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:3333/products/all')
        const discounted = response.data.filter(p => p.discont_price)
        setProducts(discounted)
      } catch (error) {
        console.error('Error fetching discount products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDiscountProducts()
  }, [])

  const sortedProducts = [...products].sort((a, b) => {
    const priceA = a.discont_price || a.price
    const priceB = b.discont_price || b.price

    if (sortOrder === 'asc') return priceA - priceB
    if (sortOrder === 'desc') return priceB - priceA
    return 0
  })

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.discont_price || product.price,
      image: product.image
    }))
  }

  return (
    <div className={styles.categories_section}>
      <div className={styles.categories_header}>
        <div className={styles.con_link}>
          <Link to="/" className={styles.btn_all_categories}>Main Page</Link>
        </div>
        <div className={styles.border}></div>
        <div className={styles.con_link}>
          <Link to="/discount" className={styles.btn_all_categories}>Discount</Link>
        </div>
      </div>

      <div className={styles.sort_select}>
        <label>
          Сортировка по цене:{' '}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className={styles.select}
          >
            <option value="default">Без сортировки</option>
            <option value="asc">По возрастанию</option>
            <option value="desc">По убыванию</option>
          </select>
        </label>
      </div>

      <div className={styles.cards_container}>
        {loading ? (
          <p className={styles.loading}>Loading...</p>
        ) : sortedProducts.length === 0 ? (
          <p className={styles.empty}>No discounted products found.</p>
        ) : (
          sortedProducts.map(product => {
            const discount = Math.round((1 - product.discont_price / product.price) * 100)

            return (
              <div key={product.id} className={styles.card}>
                <Link to={`/products/${product.id}`} className={styles.card_link}>
                <div className={styles.discount}><p>-{discount}%</p></div>
                <img
                  src={`http://localhost:3333${product.image}`}
                  alt={product.title}
                />
                <h4>{product.title}</h4>
                <div>
                  <span className={styles.new_price}>${product.discont_price}</span>
                  <span className={styles.old_price}>${product.price}</span>
                </div>
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  className={styles.btn}
                >
                  Add to Cart
                </button>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default AllSales
