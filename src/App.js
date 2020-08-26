import React, {useState, useEffect} from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const initialTodos = [
    {
        id: 1,
        title: 'Todo #1',
        description: 'Desc del Todo #1',
        completed: false
    },
    {
        id: 2,
        title: 'Todo #2',
        description: 'Desc del Todo #2',
        completed: true
    }
];

const localTodos = JSON.parse(localStorage.getItem('todos'));

const App = () => {

    const [todos, setTodos] = useState(localTodos || initialTodos);
    const [todoEdit, setTodoEdit] = useState(null);

    useEffect(() => {

        localStorage.setItem('todos', JSON.stringify(todos));

    }, [todos]);

    const todoDelete = (todoId) => {

        if(todoEdit && todoId === todoEdit.id) {
            setTodoEdit(null);
        }

        const changedTodos = todos.filter(todo => todo.id !== todoId);
        setTodos(changedTodos);
    }

    const todoToogleCompleted = (todoId) => {

        // const changedTodos = todos.map(todo => {

        //     const todoEdit = {
        //         ...todo,
        //         completed: !todo.completed
        //     }

        //     if(todo.id === todoId) {
        //         return todoEdit
        //     }

        //     else {
        //         return todo
        //     }

        // })

        // const changedTodos = todos.map(todo => (
        //     todo.id === todoId 
        //     ? {...todo, completed: !todo.completed}
        //     : todo
        // ));

        const changedTodos = todos.map(todo => todo.id === todoId ? {...todo, completed: !todo.completed} : todo );

        setTodos(changedTodos);
    }
    
    const todoAdd = (todo) => {

        const newTodo = {
            id: Date.now(),
            ...todo,
            completed: false

        }

        const changedTodos = [
            newTodo,
            ...todos,
        ]

        setTodos(changedTodos);
    }
    
    const todoUpdate = (todoEdit) => {
        
        const changedTodos = todos.map(todo => (
            todo.id === todoEdit.id
            ? todoEdit
            : todo
        ))

        setTodos(changedTodos);

    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-8">
                    <TodoList
                        todos={todos}
                        todoDelete={todoDelete}
                        todoToogleCompleted={todoToogleCompleted}
                        setTodoEdit={setTodoEdit}
                    />
                </div>
                <div className="col-4">
                    <TodoForm 
                        todoEdit={todoEdit}
                        todoAdd={todoAdd}
                        todoUpdate={todoUpdate}
                        setTodoEdit={setTodoEdit}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;