import styles from "../assets/stylesheets/BoardContent.module.css"

export default function BoardContent() {
    return (
        <div className={styles.mainBoardContainer}>
            <div className={styles.noColumnsContainer}>
                <h2 className={styles.noColumnText}>This board is empty. Create a new column to get started.</h2>
                <button className={styles.noColumnButton}>+ Add New Column</button>
            </div>
        </div>

    )
}