import styles from "../assets/stylesheets/ViewTaskModal.module.css"
import ellipsisImg from "../assets/icon-vertical-ellipsis.svg"
import {ModalContext} from "../contexts/ModalContext.jsx"
import { useContext } from 'react'
import { deleteTask } from "../firebase/databaseService.js"
import { BoardContext } from "../contexts/BoardContext.jsx"
import {getAuth} from "firebase/auth";

// TODO dropdown menu state to change column for task
// TODO modalCheckSquare states for checked and unchecked. should change color and have a check img
// TODO add a close button
export default function ViewTaskModal({ taskData, column, onClose }) {
    const { showModal, hideModal } = useContext(ModalContext)
    const { chosenBoard } = useContext(BoardContext)
    const auth = getAuth()
    const user = auth.currentUser

    if (!taskData) {
        return null
    }

    console.log(taskData)

    let title = taskData?.title || 'No Title'
    let description = taskData?.description || 'No Description'
    let subtasksData = taskData?.subtasks || []
    let status = taskData?.status || ''

    function handleEditTaskClick() {
        showModal('EditTaskModal', { taskData: taskData })
    }

    async function handleDeleteClick() {
        await deleteTask(user, chosenBoard, column, taskData)
    }

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeaderContainer}>
                    <h2 className={styles.modalHeader}>{title}</h2>
                    <img className={styles.ellipsis} src={ellipsisImg} alt="" onClick={handleEditTaskClick}/>
                </div>
                <p className={styles.modalTaskDescription}>{description}</p>
                <p className={styles.modalSubHeading}>Subtasks (0 of {subtasksData.length})</p>
                <div className={styles.modalSubtasksContainer}>
                    {subtasksData.map((subtask, index) => (
                        <div key={index} className={styles.modalSubtaskContainer}>
                            <div className={styles.modalCheckSquare}></div>
                            <p className={styles.modalSubtaskText}>{subtask.title}</p>
                        </div>
                    ))}
                </div>
                <p className={styles.modalSubHeading}>Current Status</p>
                <div className={styles.statusDropdown}>
                    {status}
                </div>
                <button 
                    type="button"
                    onClick={() => {
                        handleDeleteClick()
                        hideModal()
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}