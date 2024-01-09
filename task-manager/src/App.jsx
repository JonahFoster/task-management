import './assets/stylesheets/App.css'
import SidePanel from './components/SidePanel'
import Header from './components/Header'
function App() {

  return (
    <main className="app-container">
        <SidePanel />
        <div className="main-content">
            <Header />
        </div>
    </main>
  )
}

export default App
