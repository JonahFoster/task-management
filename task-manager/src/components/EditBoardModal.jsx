import styles from "../assets/stylesheets/AddTaskModal.module.css"
import crossImg from "../assets/icon-cross.svg"
import {useContext, useEffect, useState} from 'react'
import {getAuth} from "firebase/auth";
import {BoardContext} from "../contexts/BoardContext.jsx";
import {collection, doc, getDocs, setDoc} from "firebase/firestore";
import {db} from "../../firebase.js";
import {ModalContext} from "../contexts/ModalContext.jsx";

export default function EditBoardModal({ onClose }) {
    const { chosenBoard } = useContext(BoardContext)
    const { hideModal } = useContext(ModalContext)
    const auth = getAuth()
    const user = auth.currentUser
    const [formData, setFormData] = useState({
        name: '',
        columns: [{ name: '', }],
    })
    const [columns, setColumns] = useState([])

    useEffect(() => {
        async function fetchColumns() {
            if (chosenBoard && user) {
                const columnsRef = collection(db, "users", user.uid, "boards", chosenBoard.id, "columns")
                const querySnapshot = await getDocs(columnsRef)
                const fetchedColumns = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                setColumns(fetchedColumns)
            }
        }

        fetchColumns()
    }, [chosenBoard, user])

    useEffect(() => {
        if (chosenBoard) {
            setFormData(formData => ({ ...formData, name: chosenBoard.name }))
        }
        if (columns.length > 0) {
            setFormData(formData => ({ ...formData, columns: columns }))
        }
    }, [chosenBoard, columns])

    async function handleSubmit(e) {
        e.preventDefault()
        if (!user) {
            console.log("No user signed in")
            return
        }
        const boardRef = doc(db, "users", user.uid, "boards", chosenBoard.id)
        await setDoc(boardRef, {
            name: formData.name
        })

        const columnsCollectionRef = collection(boardRef, "columns")
        formData.columns.forEach(async (column) => {
            if (column.id) {
                const columnRef = doc(columnsCollectionRef, column.id)
                await setDoc(columnRef, {
                    name: column.name
                }, { merge: true })
            } else {
                const columnRef = doc(columnsCollectionRef)
                await setDoc(columnRef, {
                    name: column.name,
                    tasks: []
                })
            }
        })

        hideModal()
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function handleColumns(index, event) {
        const updatedColumns = formData.columns.map((column, i) => (
            index === i ? { ...column, name: event.target.value } : column
        ))
        setFormData({ ...formData, columns: updatedColumns })
    }

    function addColumn() {
        setFormData({ ...formData, columns: [...formData.columns, {name: ''}] })
    }

    function removeColumn(index) {
        const updatedColumns = formData.columns.filter((_, i) => i !== index)
        setFormData({ ...formData, columns: updatedColumns })
    }

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalHeading}>Edit Board</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.modalFormInputContainer}>
                        <label className={styles.modalFormLabel} htmlFor="name">Board Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Web Design"
                            className={styles.modalFormText}
                        />
                    </div>
                    <div className={styles.modalFormInputContainer}>
                        <label className={styles.modalFormLabel} htmlFor="column">Board Columns</label>
                        {formData.columns.map((column, index) => (
                            <div className={styles.modalFormSubtask} key={index}>
                                <input
                                    id={`Column ${index}`}
                                    name="column"
                                    type="text"
                                    value={column.name}
                                    onChange={(e) => handleColumns(index, e)}
                                    placeholder="e.g. Todo"
                                    className={styles.modalFormText + " " + styles.modalFormSubTaskText}
                                />
                                <button className={styles.modalRemoveSubtask} type="button"
                                        onClick={() => removeColumn(index)}>
                                    <img src={crossImg} alt=""/>
                                </button>
                            </div>
                        ))}
                        <button className={styles.modalFormAddSubtaskBtn} type="button" onClick={addColumn}>
                            + Add New Column
                        </button>
                    </div>
                    <button type="submit" className={styles.modalSubmitBtn}>Edit Board</button>
                </form>
            </div>
        </div>
    )
}
