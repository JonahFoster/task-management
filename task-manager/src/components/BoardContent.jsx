import styles from "../assets/stylesheets/BoardContent.module.css"

export default function BoardContent() {
    let column = true;
    return (
        <div>
            {column ? (
                <div className={styles.mainBoardContainer}>
                    <div className={styles.columnContainer}>
                        <div className={styles.columnHeader}>
                            <div className={styles.columnHeaderCircle}></div>
                            <p className={styles.columnHeaderTitle}>TODO (3)</p>
                        </div>
                        <div className={styles.tasksContainer}>
                            <div className={styles.individualTaskContainer}>
                                <h3 className={styles.taskTitle}>Build UI for onboarding flow</h3>
                                <p className={styles.taskSubTitle}>0 of 3 subtasks</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.noColumnsMainBoardContainer}>
                    <div className={styles.noColumnsContainer}>
                        <h2 className={styles.noColumnText}>This board is empty. Create a new column to get started.</h2>
                        <button className={styles.noColumnButton}>+ Add New Column</button>
                    </div>
                </div>
            )}
        </div>
    )
}
