import styles from "../assets/stylesheets/BoardContent.module.css"
import { useEffect, useState, useContext  } from 'react'
import { BoardContext } from '../contexts/BoardContext.jsx'
import { ModalContext } from "../contexts/ModalContext.jsx"
import { collection, getDocs, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase.js"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import {fetchBoardData} from "../firebase/databaseService.js"

export default function BoardContent() {
    const { chosenBoard } = useContext(BoardContext)
    const [ columns, setColumns ] = useState([])
    const { showModal } = useContext(ModalContext)
    const auth = getAuth()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && chosenBoard) {
                const columnsRef = collection(db, "users", user.uid, "boards", chosenBoard.id, "columns");
    
                const unsubscribeFromColumns = onSnapshot(columnsRef, (columnsSnapshot) => {
                    const cols = [];
    
                    columnsSnapshot.forEach((doc) => {
                        const column = { id: doc.id, ...doc.data(), tasks: [] };
                        cols.push(column); 
    
                        const tasksRef = collection(db, "users", user.uid, "boards", chosenBoard.id, "columns", doc.id, "tasks");
    
                        onSnapshot(tasksRef, (tasksSnapshot) => {
                            const tasks = tasksSnapshot.docs.map(taskDoc => ({ id: taskDoc.id, ...taskDoc.data() }));
                            const columnIndex = cols.findIndex(c => c.id === doc.id);
                            if (columnIndex !== -1) {
                                cols[columnIndex].tasks = tasks;
                                setColumns([...cols]);
                            }
                        });
                    });
    
                    setColumns(cols);
                });
    
                return () => {
                    unsubscribeFromColumns();
                };
            }
            return () => {};
        });
    
        return unsubscribe;
    }, [chosenBoard, auth]);
    
    function handleTaskClick(column, task) {
        showModal('ViewTaskModal', { taskData: task, column: column })
    }

    async function setBoardData(user) {
        if (chosenBoard) {
            const fetchedColumns = await fetchBoardData(user, chosenBoard)
            setColumns(fetchedColumns)
        }
    }

    useEffect(() => {
        setBoardData()
    }, [chosenBoard])

    const hasColumns = columns?.length > 0

    return (
        <div>
            {hasColumns ? (
                <div className={styles.mainBoardContainer}>
                    {columns.map((column, index) => (
                        <div key={index} className={styles.columnContainer}>
                            <div className={styles.columnHeader}>
                                <div className={styles.columnHeaderCircle}></div>
                                <p className={styles.columnHeaderTitle}>{column.name} ({column?.tasks?.length})</p>
                            </div>
                            <div className={styles.tasksContainer}>
                                {column.tasks.map(task => (
                                    <div key={task.id} className={styles.individualTaskContainer} onClick={() => handleTaskClick(column, task)}>
                                        <h3 className={styles.taskTitle}>{task.title}</h3>
                                        <p className={styles.taskSubTitle}>
                                            0 of {task.subtasks && Array.isArray(task.subtasks) ? task.subtasks.length : 0} subtasks
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className={styles.columnContainer}>
                        <div className={styles.columnHeader}>
                            <p className={styles.columnHeaderTitle + " " + styles.addColumnHeader} aria-hidden="true">Add a new column</p>
                        </div>
                    </div>
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
