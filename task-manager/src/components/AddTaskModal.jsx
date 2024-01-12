import styles from "../assets/stylesheets/AddTaskModal.module.css"
import ellipsisImg from "../assets/icon-vertical-ellipsis.svg"
import { useState } from 'react'

// TODO handle multiple subtasks

export default function AddTaskModal({ onClose }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        subtasks: [{ title: '', }],
        column: ''
    })

    function handleSubmit() {
        console.log("temp")
        // Code to upload data to Firebase
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <form onSubmit={handleSubmit}>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Take coffee break"
                    />
                </form>
            </div>
        </div>
    )
}