import styles from "../assets/stylesheets/DeleteModal.module.css"

export default function DeleteTaskModal() {
    return (
        <div className={styles.modalContainer}>
            <h2 className={styles.modalHeader}>Delete this task?</h2>
            <p className={styles.modalBodyText}>Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed.</p>
            <div className={styles.modalButtonContainer}>
                <button className={styles.modalDelete + ' ' + styles.modalBtn}>Delete</button>
                <button className={styles.modalCancel + ' ' + styles.modalBtn}>Cancel</button>
            </div>
        </div>
    )
}