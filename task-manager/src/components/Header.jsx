import styles from "../assets/stylesheets/Header.module.css"
import verticalEllipsisImg from "../assets/icon-vertical-ellipsis.svg"

export default function Header() {
    return (
        <header>
            <h1 className={styles.boardName}>Platform Launch</h1>
            <button className={styles.headerAddBtn}>+ Add New Task</button>
            <img className={styles.ellipsisImg} src={verticalEllipsisImg} alt="" />
        </header>
    )
}