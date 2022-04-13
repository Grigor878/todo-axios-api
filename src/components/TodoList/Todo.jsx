import React from "react";

const Todo = ({ todo, index, handleDeleteTodo }) => {
  return (
    <div className="todo">
      <span className="todo-text">
        {index + 1}. {todo.text}
      </span>
      <span onClick={() => handleDeleteTodo(todo.id)} className="todo-delete">
        x
      </span>
    </div>
  );
};

export default Todo;
