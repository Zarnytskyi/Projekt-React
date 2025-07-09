import React, { useEffect, useState } from 'react'
import bg from '../../ui/img.svg'
import styles from './MainPage.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import pets from '../../ui/pets.png'
import { useForm } from 'react-hook-form';

const MainPage = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [exist, setExist] = useState(false)
  const [success, setSuccess] = useState(false);
  const [product, setProduct] = useState([])
  const {
        register,
        handleSubmit,
        reset,
        formState:{ errors },
    } = useForm({
      mode: 'onBlur',
    });

const onSubmit = async (data) => {
  try {
    setLoading(true);
    setSuccess(false);
    setExist(false);

    await axios.post('http://localhost:3333/sale/send', data);

    setSuccess(true);
    reset();
  } catch (error) {
    console.error("Error sending discount:", error);
  } finally {
    setLoading(false);
  }
};


  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:3333/categories/all')
      setItems(response.data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }finally{
      setLoading(false)
    }
  }
  const fetchDataProduct = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:3333/products/all')
      setProduct(response.data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
    fetchDataProduct();
  }, [])

  return (
    <div>
      <section className={styles.background_section}>
        <div>
          <h2 className={styles.title}>
            Amazing Discounts on Pets Products!
          </h2>
          <Link to="/discount">
            <button className={styles.btn_discount}>Check out</button>
          </Link>
        </div>
        <img className={styles.bg} src={bg} alt="bg_cat_and_dog" />
      </section>

      <section className={styles.categories_section}>
        <div className={styles.categories_header}>
          <h3>Categories</h3>
          <div className={styles.border}>
          </div>
          <div className={styles.con_link}>
            <Link to="category" className={styles.btn_all_categories}>
            All Categories →
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
}}>Loading ...</p>
  ) : (
    items.slice(0, 4).map((category) => (
      <Link
        to={`category/${category.id}`}
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
      </section>
      <section className={styles.discountSection}>
      <div className={styles.left}>
        <h2 className={styles.heading}>5% off on the first order</h2>
        <img src={pets} alt="pets" className={styles.petsImage} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          placeholder="Name"
          {...register('name', { required: 'Field is required' })}
          className={styles.input}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}

        <input
          placeholder="Phone number"
          {...register('phone', { required: 'Field is required' })}
          className={styles.input}
        />
        {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}

        <input
          placeholder="Email"
          {...register('email', { required: 'Field is required' })}
          className={styles.input}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <button type="submit" className={styles.button}>
          Get a discount
        </button>
        {success && (
  <p className={styles.successMessage}>
    ✅ Your request has been submitted successfully!
  </p>
)}
        {exist && (
  <p className={styles.existMessage}>
    You have already received a discount.
  </p>
)}
      </form>
    </section>
    <section className={styles.product_section}>
        <div className={styles.product_header}>
          <h3>Categories</h3>
          <div className={styles.border}>
          </div>
          <div className={styles.con_link}>
            <Link to="allSales" className={styles.btn_all_product}>
            All Sales →
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
}}>Loading ...</p>
  ) : (
    product.slice(0, 4).map((products) => (
      <Link
        to={`product/${products.id}`}
        key={products.id}
        className={styles.card}
      >
        <img
          src={`http://localhost:3333${products.image}`}
          alt={products.title}
        />
        <h4>{products.title}</h4>
{products.discont_price !== null ? (
  <div>
    <span className={styles.discount_price}>${products.discont_price}</span>
    <span className={styles.price}>${products.price}</span>
  </div>
) : (
  <span className={styles.Normalprice}>${products.price}</span>
)}
      </Link>
    ))
  )}
</div>
      </section>
    </div>
  )
}

export default MainPage
