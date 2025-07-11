import { Link } from "react-router-dom"
import styles from './Error.module.css'
import error from '../../ui/404.png'

const Error = () => {
  return (
    <div className={styles.error_con}>
        <img src={error} alt="error404" />
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.desc}>We’re sorry, the page you requested could not be found.
Please go back to the homepage.</p>
        <Link to='/'><button className={styles.btn}></button></Link>
    </div>
  )
}

export default Error