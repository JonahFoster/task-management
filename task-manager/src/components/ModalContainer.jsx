import { useContext } from 'react'
import { ModalContext } from "../contexts/ModalContext.jsx"

// Import modal components

const modalComponents = {
    // add individual modal components here
}

export default function ModalContainer() {
    const { modalState, hideModal } = useContext(ModalContext)

    if (!modalState.modalType) return null

    const ActiveModal = modalComponents[modalState.modalType]

    return (
        <div className="">
            <ActiveModal {...modalState.modalProps} onClose={hideModal} />
        </div>
    )
}