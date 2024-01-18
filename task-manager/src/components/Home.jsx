import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Header from "./Header.jsx"
import { useContext } from "react"
import { ModalContext } from "../contexts/ModalContext.jsx"
import styles from '../assets/stylesheets/Home.module.css'

export default function Home() {

    const auth = getAuth()
    const navigate = useNavigate()
    const { showModal } = useContext(ModalContext)

    function handleSignUp() {
        showModal('SignUpModal')
    }

    function handleLogin() {
        showModal('LoginModal')
    }

    return (
        <div>
            <Header />
            <div className={styles.heroSection}>
                <h1 className={styles.welcomeTitle}>start your <span className={styles.welcomeTitleJourni}>journi</span></h1>
                <div className={styles.buttonContainer}>
                    <button className={styles.loginBtn} onClick={handleLogin}>Login</button>
                    <button className={styles.signUpBtn} onClick={handleSignUp}>Sign Up</button>
                </div>
            </div>

        </div>
    )
}