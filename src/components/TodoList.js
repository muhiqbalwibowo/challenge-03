import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Link } from "react-router-dom";

const TodoList = ({ isRefresh, setRefresh }) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchMode, setSearchMode] = useState(false);

  useEffect(() => {
    // memanggil API untuk mengambil data todos
    if (isRefresh) {
      fetch("http://localhost:8000/todos")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRefresh(false);
          // ketika Rest API sukses, simpan data dari response ke dalam state lokal
          setTodos(data);
        })
        .catch((err) => {
          setRefresh(false);
          if (err.name === "AbortError") {
            console.log("fetch aborted.");
          }
        });
    }
  }, [isRefresh, setRefresh]);

  // Fungsi untuk mengubah filter
  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const filterTodos = (todoList, currentFilter) => {
    if (currentFilter === "All") {
      return todoList;
    } else if (currentFilter === "Done") {
      return todoList.filter((todo) => todo.complete);
    } else if (currentFilter === "Todo") {
      return todoList.filter((todo) => !todo.complete);
    }
  };

  const searchTodos = () => {
    // Buat salinan daftar todos yang akan dicari
    const todosToSearch = [...todos];

    // Lakukan pencarian berdasarkan kata kunci pencarian
    const searchedTodos = todosToSearch.filter((todo) =>
      todo.task.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    // Update daftar todos sesuai dengan hasil pencarian dan aktifkan mode pencarian
    setTodos(searchedTodos);
    setSearchMode(true);
  };

  const clearSearch = () => {
    // Reset daftar todos ke daftar lengkap dan nonaktifkan mode pencarian
    setTodos([]);
    setSearchMode(false);

    // Refresh daftar todos untuk mengambil data dari server lagi
    setRefresh(true);
  };

  return (
    <div>
      <div className="header">
        <input
          //   type="text"
          placeholder="Search task..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        {searchMode ? (
          <span className="add-button" onClick={() => clearSearch()}>
            Show All
          </span>
        ) : (
          <span className="add-button" onClick={() => searchTodos()}>
            Search
          </span>
        )}
      </div>
      <div className="container" style={{ gap: 20 }}>
        <button className="add-fillter" onClick={() => changeFilter("All")}>
          All
        </button>
        <button className="add-fillter" onClick={() => changeFilter("Done")}>
          Done
        </button>
        <button className="add-fillter" onClick={() => changeFilter("Todo")}>
          Todo
        </button>
        <Link to="/add" className="add-fillter">
          <button className="add-fillter">Add Todo</button>
        </Link>
      </div>
      <ul id="todo-list">
        {filterTodos(todos, filter).map((todo) => (
          <TodoItem todo={todo} key={todo.id} setRefresh={setRefresh} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
