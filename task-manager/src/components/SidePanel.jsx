import styles from "../assets/stylesheets/SidePanel.module.css"
import boardImg from "../assets/icon-board.svg"
import hideSidebarImg from "../assets/icon-hide-sidebar.svg"

export default function SidePanel() {
    return (
        <section>
            <div className={styles.panelHeader}>
                <h1>kanban</h1>
            </div>
            <div className={styles.panelContent}>
                <h4>ALL BOARDS ()</h4>
                <div className={styles.panelItem + ' ' + styles.panelItemSelected}>
                    <img src={boardImg} alt="" />
                    <p>Platform Launch</p>
                </div>
                <div className={styles.panelItem}>
                    <img src={boardImg} alt="" />
                    <p>Marketing Plan</p>
                </div>
                <div className={styles.panelItem + ' ' + styles.panelItemNew}>
                    <img src={boardImg} alt="" />
                    <p>+ Create New Board</p>
                </div>
            </div>
            <div className={styles.panelItem + ' ' + styles.panelFooterContent}>
                <img src={hideSidebarImg} alt="" />
                <p>Hide Sidebar</p>
            </div>
        </section>
    )
}