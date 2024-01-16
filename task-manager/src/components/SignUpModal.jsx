import styles from "../assets/stylesheets/SignUpModal.module.css"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import {useContext, useState} from "react"
import {ModalContext} from "../contexts/ModalContext.jsx"

// TODO
// finish using submitted, error, and password equal state
// make any necessary changes to optimize
// add login link
// close modal if sign up goes well
// fix how text looks in input

export default function SignUpModal() {
    const auth = getAuth()
    const [error, setError] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [passwordsEqual, setPasswordsEqual] = useState(true)
    const { hideModal } = useContext(ModalContext)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (
            formData.name === "" ||
            formData.email === "" ||
            formData.password === "" ||
            formData.confirmPassword === ""
        ) {
            setError(true)
        } else if (!(formData.password === formData.confirmPassword)) {
            setPasswordsEqual(false)
        }
        else {
            setSubmitted(true)
            setError(false)
            createUserWithEmailAndPassword(auth, formData.email, formData.password)
                .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user
                    // ...
                })
                .catch((error) => {
                    console.log(error.code + ' ' + error.message)
                })
            hideModal()
        }
    }

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalHeading}>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className={styles.modalLabel}>Email</label>
                    <input type="email" name="email" id="email" className={styles.modalEmailInput}
                           onChange={handleChange}/>
                    <div className={styles.modalPasswordsContainer}>
                        <div>
                            <label htmlFor="password" className={styles.modalLabel}>Password</label>
                            <input type="password" name="password" id="password" className={styles.modalPasswordInput}
                                   onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className={styles.modalLabel}>Confirm Password</label>
                            <input type="password" name="confirmPassword" id="confirmPassword"
                                   className={styles.modalPasswordInput} onChange={handleChange}/>
                        </div>
                    </div>
                    {error && (
                        <p className={styles.modalSubHeading + ' ' + styles.modalSubHeadingError}>
                            Fields cannot be empty
                        </p>
                    )}
                    {!passwordsEqual && (
                        <p className={styles.modalSubHeading + ' ' + styles.modalSubHeadingError}>
                            Passwords don't match
                        </p>
                    )}
                    <button className={styles.modalSignUpButton}>Get Started</button>
                </form>
                <p className={styles.modalSubHeading}>Already have an account? Login here instead!</p>
            </div>
        </div>
    )
}
