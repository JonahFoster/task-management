import {collection, doc, getDocs, query, setDoc, where} from "firebase/firestore"
import {db} from "../../firebase.js"

export const findColumn = async ( user, chosenBoard, column ) => {
    try {
        const columnsRef = collection(db, "users", user.uid, "boards", chosenBoard.id, "columns")
        const columnQuery = query(columnsRef, where("name", "==", column))
        const querySnapshot = await getDocs(columnQuery)
        const columnDoc = querySnapshot.docs[0]
        return (columnDoc)
    } catch (error) {
        console.log("Error in findColumn: ", error)
        return null
    }
}

export const findAllColumns = async ( user, chosenBoard ) => {
    try {
        const columnsRef = collection(db, "users", user.uid, "boards", chosenBoard.id, "columns")
        const querySnapshot = await getDocs(columnsRef)
        return querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    } catch (error) {
        console.log("Error in findAllColumns: ", error)
        return []
    }
}

export const createTask = async ( user, chosenBoard, column, taskData ) => {
    try {
        const columnDoc = await findColumn( user, chosenBoard, column )
        if (!columnDoc) {
            throw new Error("Column not found");
        }
        const taskDocRef = doc(collection(db, "users", user.uid, "boards", chosenBoard.id, "columns", columnDoc.id, "tasks"))
        await setDoc(taskDocRef, {
            title: taskData.title,
            description: taskData.description,
            status: taskData.column,
            subtasks: taskData.subtasks
        })
    } catch (error) {
        console.log("Error in createTask: ", error)
    }
}

export const createBoard = async ( user, boardData ) => {
    try {
        const boardRef = doc(collection(db, "users", user.uid, "boards"))
        await setDoc(boardRef, {
            name: boardData.name
        })
        const columnCollectionRef = collection(boardRef, "columns")
        for (const column of boardData.columns) {
            const columnRef = doc(columnCollectionRef)
            await setDoc(columnRef, {
                name: column.name
            })
        }
    } catch (error) {
        console.log("Error in createBoard: ", error)
    }
}