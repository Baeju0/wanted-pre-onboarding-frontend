import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";

function Todo() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [modifyIndex, setModifyIndex] = useState(-1);
    const [modifyText, setModifyText] = useState('');

    const [redirectSingin, setRedirectSingin] = useState(false);

    useEffect(()=> {
        const token = !localStorage.getItem("access_token");

        if(token) {
            setRedirectSingin(true);
        }
    },[]);

    if(redirectSingin) {
        return <Navigate to="/signin"/>;
    }


    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            setTodos([...todos, { text: newTodo, completed: false }]);
            setNewTodo('');
        }
    };

    const handleToggleComplete = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        setTodos(updatedTodos);
    };

    const handleDeleteTodo = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
    };

    const handleStartModify = (index, text) => {
        setModifyIndex(index);
        setModifyText(text);
    };

    const handleModifyChange = (event) => {
        setModifyText(event.target.value);
    };

    const handleSubmitModify = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].text = modifyText;
        setTodos(updatedTodos);
        setModifyIndex(-1);
        setModifyText('');
    };

    const handleCancelModify = () => {
        setModifyIndex(-1);
        setModifyText('');
    };

    return (
        <div>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <label>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggleComplete(index)}
                            />
                            <span>{todo.text}</span>
                        </label>
                        <button
                            onClick={() => handleStartModify(index, todo.text)}
                            data-testid="modify-button"
                        >
                            수정
                        </button>
                        <button
                            onClick={() => handleDeleteTodo(index)}
                            data-testid="delete-button"
                        >
                            삭제
                        </button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                data-testid="new-todo-input"
            />
            <button onClick={handleAddTodo} data-testid="new-todo-add-button">
                추가
            </button>

            {modifyIndex !== -1 && (
                <div>
                    <input
                        type="text"
                        value={modifyText}
                        onChange={handleModifyChange}
                        data-testid="modify-input"
                    />
                    <button
                        onClick={() => handleSubmitModify(modifyIndex)}
                        data-testid="submit-button"
                    >
                        제출
                    </button>
                    <button
                        onClick={handleCancelModify}
                        data-testid="cancel-button"
                    >
                        취소
                    </button>
                </div>
            )}
        </div>
    );
}

export default Todo;