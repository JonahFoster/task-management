import styles from "../assets/stylesheets/AddTaskModal.module.css"
import ellipsisImg from "../assets/icon-vertical-ellipsis.svg"
import crossImg from "../assets/icon-cross.svg"
import { useState } from 'react'

// TODO map columns list to select input
export default function AddTaskModal({ onClose }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        subtasks: [{ title: '', }],
        column: ''
    })

    function handleSubmit(e) {
        e.preventDefault()
        console.log("temp")
        // Code to upload data to Firebase
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function handleSubtasks(index, event) {
        const updatedSubtasks = formData.subtasks.map((subtask, i) => (
            index === i ? { ...subtask, description: event.target.value } : subtask
        ))
        setFormData({ ...formData, subtasks: updatedSubtasks })
    }

    function addSubtask() {
        setFormData({ ...formData, subtasks: [...formData.subtasks, {description: ''}] })
    }

    function removeSubtask(index) {
        const updatedSubtasks = formData.subtasks.filter((_, i) => i !== index)
        setFormData({ ...formData, subtasks: updatedSubtasks })
    }

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.modalFormInputContainer}>
                        <label className={styles.modalFormLabel} htmlFor="title">Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Take coffee break"
                            className={styles.modalFormText}
                        />
                    </div>
                    <div className={styles.modalFormInputContainer}>
                        <label className={styles.modalFormLabel} htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="e.g. Take coffee break"
                            className={styles.modalFormText + " " + styles.modalFormTextArea}
                        />
                    </div>
                    <div className={styles.modalFormInputContainer}>
                        <label className={styles.modalFormLabel} htmlFor="subtask">Subtask</label>
                        {formData.subtasks.map((subtask, index) => (
                            <div className={styles.modalFormSubtask} key={index}>
                                <input
                                    id={`Subtask ${index}`}
                                    name="subtask"
                                    type="text"
                                    value={subtask.description}
                                    onChange={(e) => handleSubtasks(index, e)}
                                    placeholder="e.g. Take coffee break"
                                    className={styles.modalFormText + " " + styles.modalFormSubTaskText}
                                />
                                <button className={styles.modalRemoveSubtask} type="button"
                                        onClick={() => removeSubtask(index)}>
                                    <img src={crossImg} alt=""/>
                                </button>
                            </div>
                        ))}
                        <button className={styles.modalFormAddSubtaskBtn} type="button" onClick={addSubtask}>Add
                            Subtask
                        </button>
                    </div>
                    <div className={styles.modalFormInputContainer}>
                        <label className={styles.modalFormLabel} htmlFor="column">Status</label>
                        <select
                            id="column"
                            name="column"
                            value={formData.column}
                            onChange={handleChange}
                            className={styles.modalFormSelect}
                        >
                            <option value="toDo">Todo</option>
                            <option value="inProgress">In Progress</option>
                            <option value="complete">Complete</option>
                        </select>
                    </div>
                    <button type="submit" className={styles.modalSubmitBtn}>Create Task</button>
                </form>
            </div>
        </div>
    )
}