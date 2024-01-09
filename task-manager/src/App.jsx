import './assets/stylesheets/App.css'
import { BoardProvider } from './contexts/BoardContext.jsx'
import SidePanel from './components/SidePanel'
import Header from './components/Header'
import BoardContent from './components/BoardContent'
function App() {

  return (
      <BoardProvider>
          <main className="app-container">
              <SidePanel/>
              <div className="main-content">
                  <Header/>
                  <BoardContent />
              </div>
          </main>
      </BoardProvider>
  )
}

export default App
