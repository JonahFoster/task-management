import { useContext, useRef, useCallback } from 'react'
import { ModalContext } from "../contexts/ModalContext.jsx"
import ViewTaskModal from "./ViewTaskModal.jsx"
import AddTaskModal from "./AddTaskModal.jsx"
import EditTaskModal from "./EditTaskModal.jsx";
import AddBoardModal from "./AddBoardModal.jsx";

const modalComponents = {
    'ViewTaskModal': ViewTaskModal,
    "AddTaskModal": AddTaskModal,
    "EditTaskModal": EditTaskModal,
    "AddBoardModal": AddBoardModal,
}

export default function ModalContainer() {
    const { modalState, hideModal } = useContext(ModalContext)

    if (!modalState.modalType) return null

    const ActiveModal = modalComponents[modalState.modalType]

    const modalContentRef = useRef(null)

    const handleBackdropClick = useCallback((event) => {
        if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
            hideModal()
        }
    }, [hideModal])

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div ref={modalContentRef}>
                <ActiveModal {...modalState.modalProps} onClose={hideModal} />
            </div>
        </div>
    )
}