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

  const [sortOrder, setSortOrder] = useState('default')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

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

  let displayedProducts = [...products]

  if (categoryId) {
    displayedProducts = displayedProducts.filter(product =>
      product.categoryId === Number(categoryId)
    )
  }

  if (minPrice !== '') {
    displayedProducts = displayedProducts.filter(product =>
      (product.discont_price || product.price) >= parseFloat(minPrice)
    )
  }

  if (maxPrice !== '') {
    displayedProducts = displayedProducts.filter(product =>
      (product.discont_price || product.price) <= parseFloat(maxPrice)
    )
  }

  if (sortOrder === 'asc') {
    displayedProducts.sort((a, b) =>
      (a.discont_price || a.price) - (b.discont_price || b.price)
    )
  } else if (sortOrder === 'desc') {
    displayedProducts.sort((a, b) =>
      (b.discont_price || b.price) - (a.discont_price || a.price)
    )
  }

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

<div className={styles.filter_inputs}>
  <label>
    Цена от:{' '}
    <input
      type="number"
      value={minPrice}
      onChange={(e) => setMinPrice(e.target.value)}
    />
  </label>
  <label>
    до:{' '}
    <input
      type="number"
      value={maxPrice}
      onChange={(e) => setMaxPrice(e.target.value)}
    />
  </label>
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
          displayedProducts.length === 0 ? (
            <p style={{ fontSize: '24px', textAlign: 'center' }}>No products found.</p>
          ) : (
            displayedProducts.map(product => {
              const discount = product.discont_price
                ? Math.round((1 - product.discont_price / product.price) * 100)
                : 0

              return (
                <div key={product.id} className={styles.card}>
                  <Link to={`/products/${product.id}`} className={styles.card_link}>
    {discount > 0 && (
      <div className={styles.discount}>
        <p>-{discount}%</p>
      </div>
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
          )
        )}
      </div>
    </div>
  )
}

export default AllProducts
