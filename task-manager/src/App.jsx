import "./assets/stylesheets/App.css";
import { BoardProvider } from "./contexts/BoardContext.jsx";
import { ModalProvider } from "./contexts/ModalContext.jsx";
import KanbanBoard from "./components/KanbanBoard.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import ModalContainer from "./components/ModalContainer.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/app",
    element: <KanbanBoard />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <BoardProvider>
          <RouterProvider router={router} />
          <ModalContainer />
        </BoardProvider>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
