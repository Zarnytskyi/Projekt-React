import React, { useEffect, useState } from 'react'
import styles from './Category.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Category = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:3333/categories/all')
      setItems(response.data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className={styles.categories_section}>
      <div className={styles.categories_header}>
        <div className={styles.con_link}>
          <Link to="/" className={styles.btn_all_categories}>
            Main Page
          </Link>
        </div>
          <div className={styles.border}> </div>
          <div className={styles.con_link}>
            <Link to="category" className={styles.btn_all_categories}>
              All Categories
            </Link>
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
          }}>
            Loading ...
          </p>
        ) : (
          items.map((category) => (
            <Link
              to={`/category/${category.id}`}
              key={category.id}
              className={styles.card}
            >
              <img
                src={`http://localhost:3333${category.image}`}
                alt={category.title}
              />
              <h4>{category.title}</h4>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default Category