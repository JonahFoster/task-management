import { createContext, useState } from 'react'

export const ModalContext = createContext({
    modalState: { modalType: null, modalProps: {} },
    showModal: () => {},
    hideModal: () => {}
})

export const ModalProvider = ({ children }) => {
    const [modalState, setModalState] = useState({ modalType: null, modalProps: {} })

    const showModal = (modalType, modalProps = {}) => {
        setModalState({ modalType, modalProps })
    }

    const hideModal = () => {
        setModalState({ modalType: null, modalProps: {} })
    }

    return (
        <ModalContext.Provider value={{ modalState, showModal, hideModal }}>
            {children}
        </ModalContext.Provider>
    )
}
