import './assets/stylesheets/App.css'
import { BoardProvider } from './contexts/BoardContext.jsx'
import SidePanel from './components/SidePanel'
import Header from './components/Header'
import BoardContent from './components/BoardContent'
import {ModalProvider} from "./contexts/ModalContext.jsx"
import ModalContainer from "./components/ModalContainer.jsx"

function App() {

  return (
      <ModalProvider>
          <BoardProvider>
              <main className="app-container">
                  <SidePanel/>
                  <div className="main-content">
                      <Header/>
                      <BoardContent />
                  </div>
                  <ModalContainer />
              </main>
          </BoardProvider>
      </ModalProvider>
  )
}

export default App
