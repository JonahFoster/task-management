import styles from "../assets/stylesheets/Header.module.css"
import verticalEllipsisImg from "../assets/icon-vertical-ellipsis.svg"
import { BoardContext } from '../contexts/BoardContext.jsx'
import {ModalContext} from "../contexts/ModalContext.jsx"
import { useContext } from 'react'
import { Link } from "react-router-dom";

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
            <h1 className={styles.boardName}>journi</h1>
            <nav className={styles.nav}>
                <Link to="/" className={styles.navItem}>Home</Link>
                <Link to="/app" className={styles.navItem}>App</Link>
                <Link to="/why" className={styles.navItem}>Why Journi</Link>
                <Link to="/about" className={styles.navItem}>About Us</Link>
            </nav>
        </header>
    )
}