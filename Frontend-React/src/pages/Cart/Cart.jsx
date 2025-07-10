import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import styles from './Cart.module.css'
import { incrementQuantity, decrementQuantity, clearCart } from '../../redux/cartSlicer'

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items)
  const dispatch = useDispatch()

  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = async (data) => {
    if (cartItems.length === 0) return

    const orderData = {
      customer: data,
      items: cartItems.map(({ id, quantity }) => ({ id, quantity })),
    }

    try {
      setLoading(true)
      setError(null)
      await axios.post('http://localhost:3333/order/send', orderData)
      console.log('Заказ отправлен, открываю модалку')
      dispatch(clearCart())
      setModalOpen(true)
      reset()
    } catch (error) {
      setError('Ошибка при оформлении заказа. Попробуйте снова.', error)
    } finally {
      setLoading(false)
    }
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cartItems.length === 0 && !modalOpen) {
  return <p className={styles.empty}>Корзина пуста.</p>
}


  return (
    <div className={styles.cart_container}>
      <h2>Корзина</h2>
      <div className={styles.cart_items}>
        {cartItems.map(item => (
          <div key={item.id} className={styles.cart_card}>
            <img src={`http://localhost:3333${item.image}`} alt={item.title} className={styles.image} />
            <div className={styles.details}>
              <h4>{item.title}</h4>
              <p>Цена за штуку: ${item.price.toFixed(2)}</p>
              <div className={styles.quantity_controls}>
                <button onClick={() => dispatch(decrementQuantity(item.id))} disabled={item.quantity <= 1}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
              </div>
              <p>Итого: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <h3>Общая сумма: ${totalPrice.toFixed(2)}</h3>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.order_form}>
        <h3>Оформить заказ</h3>

        <label>
          Имя:
          <input
            {...register('name', { required: 'Введите имя' })}
            type="text"
            placeholder="Ваше имя"
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </label>

        <label>
          Телефон:
          <input
            {...register('phone', {
              required: 'Введите телефон',
              pattern: {
                message: 'Неверный формат телефона',
              }
            })}
            type="tel"
            placeholder="+7 999 999 99 99"
          />
          {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
        </label>

        <label>
          Электронная почта:
          <input
            {...register('email', {
              required: 'Введите email',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Неверный формат email',
              }
            })}
            type="email"
            placeholder="example@mail.com"
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </label>

        <button type="submit" disabled={loading} className={styles.submit_btn}>
          {loading ? 'Отправка...' : 'Оформить заказ'}
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </form>

      {modalOpen && (
        <div className={styles.modal_overlay} onClick={() => setModalOpen(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h3>Спасибо за заказ!</h3>
            <p>Ваш заказ успешно отправлен.</p>
            <button onClick={() => setModalOpen(false)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
