import styles from "../assets/stylesheets/SignUpModal.module.css"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUpModal() {
    const auth = getAuth()
    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalHeading}>Sign Up</h2>
                <label htmlFor="email" className={styles.modalLabel}>Email</label>
                <input type="text" name="email" id="email" className={styles.modalEmailInput} />
                <div className={styles.modalPasswordsContainer}>
                    <div>
                        <label htmlFor="password" className={styles.modalLabel}>Password</label>
                        <input type="text" name="password" id="password" className={styles.modalPasswordInput}/>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className={styles.modalLabel}>Confirm Password</label>
                        <input type="text" name="confirmPassword" id="confirmPassword" className={styles.modalPasswordInput}/>
                    </div>
                </div>
                <button className={styles.modalSignUpButton}>Get Started</button>
                <p className={styles.modalSubHeading}>Already have an account? Login here instead!</p>
            </div>
        </div>
    )
}
