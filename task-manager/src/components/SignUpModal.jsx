import styles from "../assets/stylesheets/SignUpModal.module.css"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import {useContext, useState} from "react"
import {ModalContext} from "../contexts/ModalContext.jsx"
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from "../../firebase.js"

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
        confirmPassword: '',
        board: '',
    })

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (
            formData.email === "" ||
            formData.password === "" ||
            formData.confirmPassword === "" ||
            formData.board === ""
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
                    createUserCollection(user.uid, formData.board)
                })
                .catch((error) => {
                    console.log(error.code + ' ' + error.message)
                })
            hideModal()
        }
    }

    async function createUserCollection(userId, boardName) {
        const userDocRef = doc(db, "users", userId);
        await setDoc(userDocRef, {});
        const boardsCollectionRef = collection(userDocRef, "boards");
        const firstBoardDocRef = doc(boardsCollectionRef);
        await setDoc(firstBoardDocRef, { name: boardName });
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
                    <label htmlFor="board" className={styles.modalLabel}>First Board Name - This can be changed later</label>
                    <input type="text" name="board" id="board" className={styles.modalEmailInput}
                           onChange={handleChange}/>
                    <button className={styles.modalSignUpButton}>Get Started</button>
                </form>
                <p className={styles.modalSubHeading}>Already have an account? Login here instead!</p>
            </div>
        </div>
    )
}
