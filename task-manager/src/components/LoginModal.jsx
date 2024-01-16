import styles from "../assets/stylesheets/SignUpModal.module.css"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import {useContext, useState} from "react"
import {ModalContext} from "../contexts/ModalContext.jsx"

// TODO
// finish using submitted, error, and password equal state
// make any necessary changes to optimize
// add login link
// close modal if sign up goes well
// fix how text looks in input

export default function LoginModal() {
    const auth = getAuth()
    const [error, setError] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const { hideModal } = useContext(ModalContext)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (
            formData.email === "" ||
            formData.password === ""
        ) {
            setError(true)
        } else {
            setSubmitted(true)
            setError(false)
            signInWithEmailAndPassword(auth, formData.email, formData.password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    console.log(error.code + " " + error.message)
                });
            hideModal()
        }
    }

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalHeading}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className={styles.modalLabel}>Email</label>
                    <input type="email" name="email" id="email" className={styles.modalEmailInput}
                           onChange={handleChange}/>
                    <div>
                        <label htmlFor="password" className={styles.modalLabel}>Password</label>
                        <input type="password" name="password" id="password" className={styles.modalEmailInput}
                               onChange={handleChange}/>
                    </div>
                    {error && (
                        <p className={styles.modalSubHeading + ' ' + styles.modalSubHeadingError}>
                            Fields cannot be empty
                        </p>
                    )}
                    <button className={styles.modalSignUpButton}>Login</button>
                </form>
                <p className={styles.modalSubHeading}>Don't have an account? Sign up here!</p>
            </div>
        </div>
    )
}
