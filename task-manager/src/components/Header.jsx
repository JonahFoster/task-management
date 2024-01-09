import styles from "../assets/stylesheets/Header.module.css"
import verticalEllipsisImg from "../assets/icon-vertical-ellipsis.svg"
import { BoardContext } from '../contexts/BoardContext.jsx'
import { useContext } from 'react'
export default function Header() {
    const { chosenBoard } = useContext(BoardContext)
    return (
        <header>
            <h1 className={styles.boardName}>{chosenBoard ? chosenBoard.name : 'No board selected'}</h1>
            <button className={styles.headerAddBtn}>+ Add New Task</button>
            <img className={styles.ellipsisImg} src={verticalEllipsisImg} alt="" />
        </header>
    )
}