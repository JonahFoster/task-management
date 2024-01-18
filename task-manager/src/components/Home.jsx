import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Header from "./Header.jsx"
import { useContext } from "react"
import { ModalContext } from "../contexts/ModalContext.jsx"

export default function Home() {
    const auth = getAuth()
    const navigate = useNavigate()
    const { showModal } = useContext(ModalContext)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/app')
            } else {
                showModal('LoginModal')
            }
        })

        return () => unsubscribe()
    }, [navigate, showModal, auth])

    return (
        <div>
            <Header />
        </div>
    )
}