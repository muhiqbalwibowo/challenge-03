import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";

const TodoItem = ({ todo, setRefresh }) => {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);

  const updateTodo = () => {
    todo.complete = !todo.complete;

    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }).then(() => {
      console.log("todo updated.");
      setRefresh(true);
    });
  };

  const deleteTodo = () => {
    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "DELETE",
    }).then(() => {
      console.log("todo deleted.");
      setRefresh(true);
    });
  };

  const openEditForm = () => {
    setIsEditFormOpen(true);
  };

  const saveEditedTodo = () => {
    const editedTodo = { ...todo, task: editedTask };

    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedTodo),
    })
      .then(() => {
        console.log("Todo updated.");
        setIsEditFormOpen(false); // Tutup popup form setelah berhasil menyimpan
        setRefresh(true);
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };

  const cancelEdit = () => {
    setIsEditFormOpen(false); // Tutup popup form tanpa menyimpan perubahan
  };

  return (
    <li className={`${todo.complete ? "checked" : ""} task-container`}>
      {isEditFormOpen ? (
        <div className="edit-form">
          <input
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <button style={{ marginLeft: 10 }} onClick={saveEditedTodo}>
            Simpan
          </button>
          <button style={{ marginLeft: 10 }} onClick={cancelEdit}>
            Batal
          </button>
        </div>
      ) : (
        <>
          <div className="task-item" onClick={updateTodo}>
            {todo.task}
          </div>
          <span className="edit" onClick={openEditForm}>
            <BiEdit size={21} />
          </span>
          <span className="close" onClick={deleteTodo}>
            <TiDelete size={21} color="red" />
          </span>
        </>
      )}
    </li>
  );
};

export default TodoItem;
