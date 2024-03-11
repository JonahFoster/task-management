import styles from "../assets/stylesheets/AddTaskModal.module.css"
import crossImg from "../assets/icon-cross.svg"
import { useContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { collection, doc, setDoc } from "firebase/firestore"
import { ModalContext } from "../contexts/ModalContext.jsx"
import { db } from "../../firebase.js"
import {createBoard} from "../firebase/databaseService.js";

export default function AddBoardModal({ onClose }) {
    const auth = getAuth()
    const [currentUser, setCurrentUser] = useState(null)
    const { hideModal } = useContext(ModalContext)
    const [formData, setFormData] = useState({
        name: '',
        columns: [{ name: '', tasks: [] }],
    })

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user)
            }
        })

        return () => unsubscribe()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        console.log("Handle submit called")
        if (!currentUser) {
            console.log("No user signed in")
            return
        }
        await createBoard(currentUser, formData)
        hideModal()
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function handleColumns(index, event) {
        const updatedColumns = formData.columns.map((column, i) => (
            index === i ? { ...column, name: event.target.value, tasks: [] } : column
        ))
        setFormData({ ...formData, columns: updatedColumns })
    }

    function addColumn() {
        setFormData({ ...formData, columns: [...formData.columns, { name: '', tasks: [] }] })
    }

    function removeColumn(index) {
        const updatedColumns = formData.columns.filter((_, i) => i !== index)
        setFormData({ ...formData, columns: updatedColumns })
    }

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalHeading}>Add New Board</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.modalFormInputContainer}>
                        <label className={styles.modalFormLabel} htmlFor="name">Board Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Web Design"
                            className={styles.modalFormText}
                        />
                    </div>
                    <div className={styles.modalFormInputContainer}>
                        <label className={styles.modalFormLabel} htmlFor="column">Board Columns</label>
                        {formData.columns.map((column, index) => (
                            <div className={styles.modalFormSubtask} key={index}>
                                <input
                                    id={`Column ${index}`}
                                    name="column"
                                    type="text"
                                    value={column.name}
                                    onChange={(e) => handleColumns(index, e)}
                                    placeholder="e.g. Todo"
                                    className={styles.modalFormText + " " + styles.modalFormSubTaskText}
                                />
                                <button className={styles.modalRemoveSubtask} type="button"
                                        onClick={() => removeColumn(index)}>
                                    <img src={crossImg} alt=""/>
                                </button>
                            </div>
                        ))}
                        <button className={styles.modalFormAddSubtaskBtn} type="button" onClick={addColumn}>
                            + Add New Column
                        </button>
                    </div>
                    <button type="submit" className={styles.modalSubmitBtn}>Create Board</button>
                </form>
            </div>
        </div>
    )
}
