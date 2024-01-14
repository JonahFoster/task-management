import styles from "../assets/stylesheets/AddTaskModal.module.css"
import crossImg from "../assets/icon-cross.svg"
import { useState } from 'react'

export default function AddBoardModal({ onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        columns: [{ name: '', }],
    })

    function handleSubmit(e) {
        e.preventDefault()
        console.log("temp")
        // Code to upload data to Firebase
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function handleColumns(index, event) {
        const updatedColumns = formData.columns.map((subtask, i) => (
            index === i ? { ...subtask, description: event.target.value } : subtask
        ))
        setFormData({ ...formData, columns: updatedColumns })
    }

    function addColumn() {
        setFormData({ ...formData, columns: [...formData.columns, {description: ''}] })
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
                                    value={column.description}
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
                    <button type="submit" className={styles.modalSubmitBtn}>Create Task</button>
                </form>
            </div>
        </div>
    )
}