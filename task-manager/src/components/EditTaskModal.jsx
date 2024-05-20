import styles from "../assets/stylesheets/AddTaskModal.module.css";
import crossImg from "../assets/icon-cross.svg";
import { useContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { BoardContext } from "../contexts/BoardContext.jsx";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase.js";

export default function EditTaskModal({ taskData, onClose }) {
  const { chosenBoard } = useContext(BoardContext);
  const auth = getAuth();
  const user = auth.currentUser;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subtasks: [{ title: "" }],
    column: "",
  });
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    async function fetchColumns() {
      if (chosenBoard && user) {
        const columnsRef = collection(
          db,
          "users",
          user.uid,
          "boards",
          chosenBoard.id,
          "columns"
        );
        const querySnapshot = await getDocs(columnsRef);
        const fetchedColumns = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setColumns(fetchedColumns);
      }
    }

    if (taskData) {
      setFormData({
        title: taskData.title || "",
        description: taskData.description || "",
        subtasks: taskData.subtasks || [{ title: "" }],
        column: taskData.status || "",
      });

      fetchColumns();
    }
  }, [taskData, chosenBoard, user]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user || !chosenBoard || !taskData) {
      console.log("No user or board or task selected");
      return;
    }
    const columnsRef = collection(
      db,
      "users",
      user.uid,
      "boards",
      chosenBoard.id,
      "columns"
    );
    const oldColumnQuery = query(
      columnsRef,
      where("name", "==", taskData.status)
    );
    const oldColumnSnapshot = await getDocs(oldColumnQuery);
    const newColumnQuery = query(
      columnsRef,
      where("name", "==", formData.column)
    );
    const newColumnSnapshot = await getDocs(newColumnQuery);

    const newColumnDoc = newColumnSnapshot.docs[0];
    const oldColumnDoc = oldColumnSnapshot.docs[0];

    const taskDocRef = doc(
      db,
      "users",
      user.uid,
      "boards",
      chosenBoard.id,
      "columns",
      newColumnDoc.id,
      "tasks",
      taskData.id
    );
    await setDoc(taskDocRef, {
      description: formData.description,
      status: formData.column,
      title: formData.title,
      subtasks: formData.subtasks.map((subtask) => ({ title: subtask.title })),
    });
    if (formData.column !== taskData.status) {
      const oldTaskDocRef = doc(
        db,
        "users",
        user.uid,
        "boards",
        chosenBoard.id,
        "columns",
        oldColumnDoc.id,
        "tasks",
        taskData.id
      );
      await deleteDoc(oldTaskDocRef);
    }
    onClose();
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubtasks(index, event) {
    const updatedSubtasks = formData.subtasks.map((subtask, i) =>
      index === i ? { ...subtask, title: event.target.value } : subtask
    );
    setFormData({ ...formData, subtasks: updatedSubtasks });
  }

  function addSubtask() {
    setFormData({
      ...formData,
      subtasks: [...formData.subtasks, { title: "" }],
    });
  }

  function removeSubtask(index) {
    const updatedSubtasks = formData.subtasks.filter((_, i) => i !== index);
    setFormData({ ...formData, subtasks: updatedSubtasks });
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalHeading}>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.modalFormInputContainer}>
            <label className={styles.modalFormLabel} htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Take coffee break"
              className={styles.modalFormText}
            />
          </div>
          <div className={styles.modalFormInputContainer}>
            <label className={styles.modalFormLabel} htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g. Take coffee break"
              className={styles.modalFormText + " " + styles.modalFormTextArea}
            />
          </div>
          <div className={styles.modalFormInputContainer}>
            <label className={styles.modalFormLabel} htmlFor="subtask">
              Subtask
            </label>
            {formData.subtasks.map((subtask, index) => (
              <div className={styles.modalFormSubtask} key={index}>
                <input
                  id={`Subtask ${index}`}
                  name="subtask"
                  type="text"
                  value={subtask.title}
                  onChange={(e) => handleSubtasks(index, e)}
                  placeholder="e.g. Take coffee break"
                  className={
                    styles.modalFormText + " " + styles.modalFormSubTaskText
                  }
                />
                <button
                  className={styles.modalRemoveSubtask}
                  type="button"
                  onClick={() => removeSubtask(index)}
                >
                  <img src={crossImg} alt="" />
                </button>
              </div>
            ))}
            <button
              className={styles.modalFormAddSubtaskBtn}
              type="button"
              onClick={addSubtask}
            >
              Add Subtask
            </button>
          </div>
          <div className={styles.modalFormInputContainer}>
            <label className={styles.modalFormLabel} htmlFor="column">
              Status
            </label>
            <select
              id="column"
              name="column"
              value={formData.column}
              onChange={handleChange}
              className={styles.modalFormSelect}
            >
              <option value="">Select a Column</option>
              {columns.map((column) => (
                <option key={column.id} value={column.name}>
                  {column.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className={styles.modalSubmitBtn}>
            Edit Task
          </button>
        </form>
      </div>
    </div>
  );
}
