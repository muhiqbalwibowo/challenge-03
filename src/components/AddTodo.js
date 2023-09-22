import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  const [task, settask] = useState("");

  // fungsi untuk menambah data todo melalui API ketika tombol "Add" di klik
  const addTodo = () => {
    const newTodo = { task, complete: false };

    fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    }).then(() => {
      // ketika sukses menambah data, reset form dengan mengeset state task menjadi empty string
      settask("");

      setTimeout(() => {
        alert("new todo added.");
      }, 500);
    });
  };

  return (
    <>
      <Container className="mt-2">
        <Row className="header">
          <div id="todo-header">
            <h2>Add Todo</h2>
          </div>
          <div></div>
          <div style={{ marginTop: 50 }}>
            <input
              type="text"
              value={task}
              onChange={(e) => settask(e.target.value)}
              placeholder="Add Todo..."
            />
          </div>
          <row>
            <div style={{ marginTop: 10 }}>
              <Link to="/">
                <button className="back-button">Kembali</button>
              </Link>
              <button
                className="back-button"
                onClick={() => {
                  addTodo();
                }}
              >
                Add
              </button>
            </div>
          </row>
        </Row>
      </Container>
    </>
  );
};

export default Header;
