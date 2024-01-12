import styles from "../assets/stylesheets/ViewTaskModal.module.css"
import ellipsisImg from "../assets/icon-vertical-ellipsis.svg"

// TODO dropdown menu state to change column for task
// TODO modalCheckSquare states for checked and unchecked. should change color and have a check img
export default function ViewTaskModal() {
    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeaderContainer}>
                    <h2 className={styles.modalHeader}>Research pricing points of various competitors and trial
                        different business models</h2>
                    <img className={styles.ellipsis} src={ellipsisImg} alt=""/>
                </div>
                <p className={styles.modalTaskDescription}>We know what we're planning to build for version one.
                    Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until
                    we have a coherent proposition.
                </p>
                <p className={styles.modalSubHeading}>Subtasks (2 of 3)</p>
                <div className={styles.modalSubtasksContainer}>
                    <div className={styles.modalSubtaskContainer}>
                        <div className={styles.modalCheckSquare}></div>
                        <p className={styles.modalSubtaskText}>Talk to potential customers about our proposed solution
                            and ask for fair price expectancy
                        </p>
                    </div>
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