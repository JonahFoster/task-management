import styles from "../assets/stylesheets/DeleteModal.module.css"

export default function DeleteBoardModal() {
    return (
        <div className={styles.modalContainer}>
            <h2 className={styles.modalHeader}>Delete this board?</h2>
            <p className={styles.modalBodyText}>Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.</p>
            <div className={styles.modalButtonContainer}>
                <button className={styles.modalDelete + ' ' + styles.modalBtn}>Delete</button>
                <button className={styles.modalCancel + ' ' + styles.modalBtn}>Cancel</button>
            </div>
        </div>
    )
}