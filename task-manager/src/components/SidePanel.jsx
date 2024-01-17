import styles from "../assets/stylesheets/SidePanel.module.css"
import boardImg from "../assets/icon-board.svg"
import hideSidebarImg from "../assets/icon-hide-sidebar.svg"
import logoImg from "../assets/logo-mobile.svg"
import showSidebarImg from "../assets/icon-show-sidebar.svg"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase.js"
import { useState, useEffect, useContext } from 'react'
import { BoardContext } from '../contexts/BoardContext.jsx'
import {ModalContext} from "../contexts/ModalContext.jsx"

export default function SidePanel() {
    const [boards, setBoards] = useState([])
    const { chosenBoard, setChosenBoard } = useContext(BoardContext)
    const [panelVisibility, setPanelVisibility] = useState(true)
    const { showModal } = useContext(ModalContext)

    function togglePanelVisibility() {
        setPanelVisibility(!panelVisibility)
    }

    function handleAddBoardClick() {
        showModal('AddBoardModal')
    }

    function handleAddTaskClick() {
        showModal('AddTaskModal')
    }

    function handleEditBoardClick() {
        showModal('EditBoardModal')
    }

    async function grabBoards() {
        const querySnapshot = await getDocs(collection(db, "users", "defaultUser", "boards"))
        const fetchedBoards = []
        querySnapshot.forEach((doc) => {
            fetchedBoards.push({ id: doc.id, ...doc.data() })
        })
        setBoards(fetchedBoards)
        if (fetchedBoards.length > 0 && !chosenBoard) {
            setChosenBoard(fetchedBoards[0])
        }
    }

    useEffect(() => {
        grabBoards()
    }, [])

    function changeBoard(board) {
        setChosenBoard(board)
    }

    return (
        <>
            {panelVisibility && (
                <section className={styles.sidePanel}>
                    <div className={styles.panelHeader}>
                        <img className={styles.logo} src={logoImg} alt=""/>
                        <h1 className={styles.logoText}>kanban</h1>
                    </div>
                    <div className={styles.panelContent}>
                        <h4>ALL BOARDS ({boards.length})</h4>
                        {boards.map((board, index) => (
                            <div key={index}
                                 className={`${styles.panelItem} ${chosenBoard && board.id === chosenBoard.id ? styles.panelItemSelected : ''}`}
                                 onClick={() => changeBoard(board)}>
                                <img className={styles.boardImg} src={boardImg} alt=""/>
                                <p>{board.name}</p>
                            </div>
                        ))}
                        <div className={styles.panelItem + ' ' + styles.panelItemNew} onClick={handleAddBoardClick}>
                            <img className={styles.boardImg} src={boardImg} alt=""/>
                            <p>Create New Board</p>
                        </div>
                    </div>
                    <div className={styles.panelManage}>
                        <h4>MANAGE</h4>
                        <div className={styles.panelItem + ' ' + styles.panelItemNew} onClick={handleEditBoardClick}>
                            <img className={styles.boardImg} src={boardImg} alt=""/>
                            <p>Edit Board</p>
                        </div>
                        <div className={styles.panelItem + ' ' + styles.panelItemNew} onClick={handleAddTaskClick}>
                            <img className={styles.boardImg} src={boardImg} alt=""/>
                            <p>Add Task</p>
                        </div>
                    </div>
                    <div className={styles.panelItem + ' ' + styles.panelFooterContent} onClick={togglePanelVisibility}>
                        <img className={styles.boardImg} src={hideSidebarImg} alt=""/>
                        <p>Hide Sidebar</p>
                    </div>
                </section>
            )}
            {!panelVisibility && (
                <div className={styles.showPanelIcon} onClick={togglePanelVisibility}>
                    <img src={showSidebarImg} alt=""/>
                </div>
            )}
        </>
    )
}
