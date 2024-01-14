import styles from "../assets/stylesheets/Header.module.css"
import verticalEllipsisImg from "../assets/icon-vertical-ellipsis.svg"
import { BoardContext } from '../contexts/BoardContext.jsx'
import {ModalContext} from "../contexts/ModalContext.jsx"
import { useContext } from 'react'

export default function Header() {
    const { chosenBoard } = useContext(BoardContext)
    const { showModal } = useContext(ModalContext)

    function handleAddTaskClick() {
        showModal('AddTaskModal')
    }

    function handleEditBoardClick() {
        showModal('EditBoardModal')
    }

    return (
        <header>
            <h1 className={styles.boardName}>{chosenBoard ? chosenBoard.name : 'No board selected'}</h1>
            <button className={styles.headerAddBtn} onClick={handleAddTaskClick}>+ Add New Task</button>
            <img className={styles.ellipsisImg} src={verticalEllipsisImg} alt="" onClick={handleEditBoardClick}/>
        </header>
    )
}