import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cartSlicer'
import { useNavigate } from 'react-router-dom'
import styles from './SingleProduct.module.css'

const SingleProduct = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:3333/products/${id}`)
        setProduct(response.data[0])
      } catch (error) {
        console.error('Error fetching product:', error)
        navigate('/error')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.discont_price || product.price,
      image: product.image,
      quantity: qty
    }))
  }

  if (loading) return <p className={styles.loading}>Loading...</p>
  if (!product) return 

  const discount = product.discont_price
    ? Math.round((1 - product.discont_price / product.price) * 100)
    : 0

  return (
    <div className={styles.wrapper}>
      <div className={styles.route}>
        <Link to="/" className={styles.route_link}>Main Page</Link>
        <span className={styles.route_arrow}>/</span>
        <Link to="/allProducts" className={styles.route_link}>All Products</Link>
        <span className={styles.route_arrow}>/</span>
        <span>{product.title}</span>
      </div>

      <div className={styles.container}>
        <img
          src={`http://localhost:3333${product.image}`}
          alt={product.title}
          className={styles.image}
        />

        <div className={styles.info}>
          <h2>{product.title}</h2>
          <p className={styles.description}>{product.description || 'No description provided.'}</p>

          <div className={styles.price_block}>
            {discount > 0 ? (
              <>
                <span className={styles.new_price}>${product.discont_price}</span>
                <span className={styles.old_price}>${product.price}</span>
                <span className={styles.discount}>-{discount}%</span>
              </>
            ) : (
              <span className={styles.normal_price}>${product.price}</span>
            )}
          </div>

          <div className={styles.qty_control}>
            <button
              className={styles.qty_btn}
              onClick={() => setQty((prev) => Math.max(prev - 1, 1))}
            >
              −
            </button>
            <span className={styles.qty_value}>{qty}</span>
            <button
              className={styles.qty_btn}
              onClick={() => setQty((prev) => prev + 1)}
            >
              +
            </button>
          </div>

          <button className={styles.btn} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct
