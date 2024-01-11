import styles from "../assets/stylesheets/BoardContent.module.css"
import { useEffect, useState, useContext } from 'react'
import { BoardContext } from '../contexts/BoardContext.jsx'
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase.js"

export default function BoardContent() {
    const { chosenBoard } = useContext(BoardContext)
    const [ columns, setColumns ] = useState([])

    async function fetchBoardData() {
        if (chosenBoard) {
            const colQuerySnapshot = await getDocs(collection(db, "users", "defaultUser", "boards", chosenBoard.id, "columns"))
            const fetchedColumns = []
            for (let doc of colQuerySnapshot.docs) {
                const column = { id: doc.id, ...doc.data() }
                const tasksSnapshot = await getDocs(collection(db, "users", "defaultUser", "boards", chosenBoard.id, "columns", doc.id, "tasks"))
                column.tasks = tasksSnapshot.docs.map(taskDoc => ({ id: taskDoc.id, ...taskDoc.data() }))
                fetchedColumns.push(column)
                console.log(fetchedColumns)
            }
            setColumns(fetchedColumns)
        }
    }

    useEffect(() => {
        fetchBoardData()
    }, [chosenBoard])

    const hasColumns = columns.length > 0

    return (
        <div>
            {hasColumns ? (
                <div className={styles.mainBoardContainer}>
                    {columns.map((column, index) => (
                        <div key={index} className={styles.columnContainer}>
                            <div className={styles.columnHeader}>
                                <div className={styles.columnHeaderCircle}></div>
                                <p className={styles.columnHeaderTitle}>{column.name} ({column.tasks.length})</p>
                            </div>
                            <div className={styles.tasksContainer}>
                                {column.tasks.map(task => (
                                    <div key={task.id} className={styles.individualTaskContainer}>
                                        <h3 className={styles.taskTitle}>{task.description}</h3>
                                        <p className={styles.taskSubTitle}>
                                            0 of {task.subtasks && Array.isArray(task.subtasks) ? task.subtasks.length : 0} subtasks
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.noColumnsMainBoardContainer}>
                    <div className={styles.noColumnsContainer}>
                        <h2 className={styles.noColumnText}>This board is empty. Create a new column to get
                            started.</h2>
                        <button className={styles.noColumnButton}>+ Add New Column</button>
                    </div>
                </div>
            )}
        </div>
    )
}
