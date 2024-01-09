
import { createContext, useState } from 'react'

export const BoardContext = createContext({
    chosenBoard: null,
    setChosenBoard: () => {}
})

export const BoardProvider = ({ children }) => {
    const [chosenBoard, setChosenBoard] = useState(null)

    return (
        <BoardContext.Provider value={{ chosenBoard, setChosenBoard }}>
            {children}
        </BoardContext.Provider>
    )
}
