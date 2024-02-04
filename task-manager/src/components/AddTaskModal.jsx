import styles from "../assets/stylesheets/AddTaskModal.module.css"
import crossImg from "../assets/icon-cross.svg"
import { useContext, useState, useEffect } from 'react'
import { doc, setDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { db } from "../../firebase.js"
import { BoardContext } from '../contexts/BoardContext.jsx'
import { getAuth } from "firebase/auth"
import { findAllColumns, createTask } from "../firebase/databaseService.js";
import {ModalContext} from "../contexts/ModalContext.jsx";

export default function AddTaskModal({ onClose }) {
    const { chosenBoard } = useContext(BoardContext)
    const { hideModal } = useContext(ModalContext)
    const auth = getAuth()
    const user = auth.currentUser
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        subtasks: [{ title: '', }],
        column: ''
    })
    const [columns, setColumns] = useState([])

    useEffect(() => {
        if (chosenBoard && user) {
            const fetchColumns = async () => {
                const allColumns = await findAllColumns( user, chosenBoard )
                setColumns(allColumns)
            }
            fetchColumns()
        }
    }, [chosenBoard, user])

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(formData)
        await createTask(user, chosenBoard, formData.column, formData)
        hideModal()
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function handleSubtasks(index, event) {
        const updatedSubtasks = formData.subtasks.map((subtask, i) => (
            index === i ? { ...subtask, title: event.target.value } : subtask
        ))
        setFormData({ ...formData, subtasks: updatedSubtasks })
    }

    function addSubtask() {
        setFormData({ ...formData, subtasks: [...formData.subtasks, { title: '' }] })
    }

    function removeSubtask(index) {
        const updatedSubtasks = formData.subtasks.filter((_, i) => i !== index)
        setFormData({ ...formData, subtasks: updatedSubtasks })
    }

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalHeading}>Add New Task</h2>
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
                            placeholder="e.g. Take a short break"
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
                                    value={subtask.title}
                                    onChange={(e) => handleSubtasks(index, e)}
                                    placeholder="e.g. Get up and stretch"
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
                            <option value="" disabled selected>Select a Column</option>
                            {columns.map((column) => (
                                <option key={column.id} value={column.name}>{column.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className={styles.modalSubmitBtn}>Create Task</button>
                </form>
            </div>
        </div>
    )
}
