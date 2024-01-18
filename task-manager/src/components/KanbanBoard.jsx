import Header from "./Header.jsx"
import BoardContent from "./BoardContent.jsx"
import SidePanel from "./SidePanel.jsx"

export default function KanbanBoard() {
    return (
        <main className="app-container">
            <SidePanel/>
            <div className="main-content">
                <Header/>
                <BoardContent/>
            </div>
        </main>
    )
}