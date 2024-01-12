import styles from "../assets/stylesheets/ViewTaskModal.module.css"
import ellipsisImg from "../assets/icon-vertical-ellipsis.svg"

// TODO dropdown menu state to change column for task
// TODO modalCheckSquare states for checked and unchecked. should change color and have a check img
// TODO add a close button
export default function ViewTaskModal({ taskData, onClose }) {
    if (!taskData) {
        return null
    }

    let title = taskData?.title || 'No Title';
    let description = taskData?.description || 'No Description';
    let subtasksData = taskData?.subtasks || [];

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeaderContainer}>
                    <h2 className={styles.modalHeader}>{title}</h2>
                    <img className={styles.ellipsis} src={ellipsisImg} alt=""/>
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
                <select className={styles.statusDropdown}>
                    <option value="toDo">Todo</option>
                    <option value="inProgress">In Progress</option>
                    <option value="complete">Complete</option>
                </select>
            </div>
        </div>
    )
}