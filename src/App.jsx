import React, { useState, useEffect } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import Title from "./components/Title";
import "./App.css";
import axios from "axios";

const endpoint = 'https://retoolapi.dev/WWAvar/data';

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const { status, data } = await axios.get(
      endpoint
    );
    if (status === 200) {
      setTodos(data);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async () => {
    if (inputValue === "") return alert('Add text');
    const newTodo = { text: inputValue };
    await axios.post(endpoint, newTodo)
      .then(res => {
        setInputValue("")
        fetchTodos(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  };

  const handleDeleteTodo = async id => {
    const { status } = await axios.delete(endpoint + `/${id}`);
    if (status === 200) {
      fetchTodos();
    }
  };

  return (
    <div className="app">
      <div className="todolist">
        <Title myName="Grig" />
        <Form
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSubmit={handleSubmit}
        />
        {todos.map((todo, index) => (
          <Todo
            todo={todo}
            index={index}
            handleDeleteTodo={handleDeleteTodo}
            key={todo.id}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
