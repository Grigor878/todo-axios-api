import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import Form from "./Form";
import Title from "./Title";
import Preloader from '../Preloader/Preloader';
import Api from "../../api/Api";

// const endpoint = 'https://retoolapi.dev/WWAvar/data';

const App = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTodos = async () => {
        const { status, data } = await Api.get(
        );
        if (status === 200) {
            setTodos(data);
            setTimeout(() => {
                setLoading(true)
            }, 1000)
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleSubmit = async () => {
        if (inputValue === "") return alert('Add text');
        const newTodo = { text: inputValue };
        await Api.post('', newTodo)
            .then(res => {
                setInputValue("")
                fetchTodos(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    };

    const handleDeleteTodo = async (id) => {
        await Api.delete(`/${id}`);
        fetchTodos();
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
                {loading ?
                    todos.map((todo, index) => (
                        <Todo
                            todo={todo}
                            index={index}
                            handleDeleteTodo={handleDeleteTodo}
                            key={todo.id}
                        />
                    ))
                    :
                    <Preloader />
                }

            </div>
        </div>
    );
};

export default App;
