import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import styles from './Product.module.css'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cartSlicer'

const AllProducts = () => {
  const { id: categoryId } = useParams()
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])

  const dispatch = useDispatch()
  
const handleAddToCart = (product) => {
  dispatch(addToCart({
    id: product.id,
    title: product.title,
    price: product.discont_price || product.price,
    image: product.image
  }))
}



  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:3333/products/all')
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDataProduct()
  }, [])

  const filteredProducts = categoryId
    ? products.filter(product => product.categoryId === Number(categoryId))
    : products

  return (
    <div className={styles.categories_section}>
      <div className={styles.categories_header}>
        <div className={styles.con_link}>
          <Link to="/" className={styles.btn_all_categories}>Main Page</Link>
        </div>
        <div className={styles.border}></div>
        <div className={styles.con_link}>
          <Link to="/category" className={styles.btn_all_categories}>All Categories</Link>
        </div>
      </div>

      <div className={styles.cards_container}>
        {loading ? (
          <p style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#555',
            textAlign: 'center',
            marginTop: '20px'
          }}>Loading ...</p>
        ) : (
          filteredProducts.length === 0 ? (
            <p style={{ fontSize: '24px', textAlign: 'center' }}>No products found.</p>
          ) : (
            filteredProducts.map(product => {
              const discount = product.discont_price
                ? Math.round((1 - product.discont_price / product.price) * 100)
                : 0

              return (
                <div key={product.id} className={styles.card}>
                  {discount > 0 && (
                    <div className={styles.discount}><p>-{discount}%</p></div>
                  )}
                  <img
                    src={`http://localhost:3333${product.image}`}
                    alt={product.title}
                  />
                  <h4>{product.title}</h4>
                  <div>
                    {discount > 0 ? (
                      <>
                        <span className={styles.new_price}>${product.discont_price}</span>
                        <span className={styles.old_price}>${product.price}</span>
                      </>
                    ) : (
                      <span className={styles.Normalprice}>${product.price}</span>
                    )}
                  </div>
                  <button onClick={() => handleAddToCart(product)} className={styles.btn}> Add to Cart </button>
                </div>
              )
            })
          )
        )}
      </div>
    </div>
  )
}

export default AllProducts
