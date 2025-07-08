import React from 'react'
import styles from './Footer.module.css'
import insta from '../../ui/ic-instagram.png'
import whatsapp from '../../ui/ic-whatsapp.png'

const Footer = () => {
  return (
    <div className={styles.container_footer}>
      <h1 className={styles.title}>Contacts</h1>
      <div>
        <div className={styles.contact_addresse}>
          <div>
              <p>Phone</p>
              <h2>+49 30 915-88492</h2>
          </div>
          <div>
              <p>Socials</p>
              <a href='#'><img className={styles.icon} src={insta} alt="logo_instagram" /></a>
              <a href='#'><img className={styles.icon} src={whatsapp} alt="logo_whatsapp" /></a>
          </div>
          <div>
              <p>Address</p>
              <h2>Wallstraẞe 9-13, 10179 Berlin, Deutschland</h2>
          </div>
          <div>
              <p>Working Hours</p>
              <h2>24 hours a day</h2>
          </div>
        </div>
        <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.231715771911!2d13.403188456606832!3d52.51114552539806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84e27db4748a5%3A0x1d538c01013c2c7!2sWallstra%C3%9Fe%209-13%2C%2010179%20Berlin!5e0!3m2!1sru!2sde!4v1751956092593!5m2!1sru!2sde"
  width="1430"
  height="350"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
      </div>
    </div>
  )
}

export default Footer