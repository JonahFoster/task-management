import './assets/stylesheets/App.css'
import { BoardProvider } from './contexts/BoardContext.jsx'
import SidePanel from './components/SidePanel'
import Header from './components/Header'
function App() {

  return (
      <BoardProvider>
          <main className="app-container">
              <SidePanel/>
              <div className="main-content">
                  <Header/>
              </div>
          </main>
      </BoardProvider>
  )
}

export default App
