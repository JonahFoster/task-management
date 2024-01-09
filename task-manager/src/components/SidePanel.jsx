import styles from "../assets/stylesheets/SidePanel.module.css"
import boardImg from "../assets/icon-board.svg"
import hideSidebarImg from "../assets/icon-hide-sidebar.svg"
import logoImg from "../assets/logo-mobile.svg"
import data from "../data.json"
export default function SidePanel() {
    return (
        <section>
            <div className={styles.panelHeader}>
                <img className={styles.logo} src={logoImg} alt="" />
                <h1 className={styles.logoText}>kanban</h1>
            </div>
            <div className={styles.panelContent}>
                <h4>ALL BOARDS ({data.boards.length})</h4>
                {data.boards.map((board, index) => (
                    <div key={index} className={styles.panelItem}>
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