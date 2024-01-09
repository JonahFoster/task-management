import styles from "../assets/stylesheets/SidePanel.module.css"
import boardImg from "../assets/icon-board.svg"
import hideSidebarImg from "../assets/icon-hide-sidebar.svg"
import logoImg from "../assets/logo-mobile.svg"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase.js"
import { useState, useEffect, useContext } from 'react'
import { BoardContext } from '../contexts/BoardContext.jsx'

export default function SidePanel() {
    const [boards, setBoards] = useState([])
    const { chosenBoard, setChosenBoard } = useContext(BoardContext)

    // Function to fetch boards from Firestore
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

    const handleBoardSelection = (board) => {
        setChosenBoard(board)
    }

    return (
        <section>
            <div className={styles.panelHeader}>
                <img className={styles.logo} src={logoImg} alt="" />
                <h1 className={styles.logoText}>kanban</h1>
            </div>
            <div className={styles.panelContent}>
                <h4>ALL BOARDS ({boards.length})</h4>
                {boards.map((board, index) => (
                    <div key={index}
                         className={`${styles.panelItem} ${chosenBoard && board.id === chosenBoard.id ? styles.panelItemSelected : ''}`}>
                        <img className={styles.boardImg} src={boardImg} alt=""/>
                        <p>{board.name}</p>
                    </div>
                ))}
                <div className={styles.panelItem + ' ' + styles.panelItemNew}>
                    <img className={styles.boardImg} src={boardImg} alt=""/>
                    <p>Create New Board</p>
                </div>
            </div>
            <div className={styles.panelItem + ' ' + styles.panelFooterContent}>
                <img className={styles.boardImg} src={hideSidebarImg} alt=""/>
                <p>Hide Sidebar</p>
            </div>
        </section>
    )
}