import React, { useState, useEffect } from 'react';

const initialFormValues = {
    title: '',
    description: ''
}

const TodoForm = ({ todoAdd, todoEdit, todoUpdate, setTodoEdit }) => {

    const [formValues, setFormValues] = useState(initialFormValues)
    const { title, description} = formValues;
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {

        if(todoEdit) {
            setFormValues(todoEdit);
        }

        else {
            setFormValues(initialFormValues);
        }

    }, [todoEdit])

    const handleInputChange = (e) => {

        const changedFormValues = {
            ...formValues,
            [e.target.name]: e.target.value
        }

        setFormValues(changedFormValues);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(title.trim() === '') {
            setError('Debes indicar un título');
            return;
        }

        if(description.trim() === '') {
            setError('Debes indicar una descripción');
            return;
        }

        
        if(todoEdit) {
            todoUpdate(formValues);
            setSuccessMessage('Actualizado con éxito');
        }

        else {
            todoAdd(formValues);
            setSuccessMessage('Agregado con éxito');
            setFormValues(initialFormValues);
        }

        setTimeout(() => {
            setSuccessMessage(null);
        }, 2000);

        setError(null);
    }

    return (
        <div>
            <h2 className="text-center display-5">{ todoEdit ? 'Editar tarea' : 'Nueva tarea'}</h2>


            {
                todoEdit &&
                <button
                    onClick={() => setTodoEdit(null)}
                    className="btn btn-sm btn-warning mb-2"
                > Cancelar edición
                </button>
            }


            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Título"
                    className="form-control"
                    value={title}
                    name="title"
                    onChange={handleInputChange}
                />

                <textarea 
                    placeholder="Descripción"
                    className="form-control mt-2"
                    value={description}
                    name="description"
                    onChange={handleInputChange}
                ></textarea>
                
                <button 
                    className="btn btn-primary btn-block mt-2"
                >{ todoEdit ? 'Actualizar tarea' : 'Agregar tarea' }
                </button>
                
            </form>

            {
                error &&
                (
                    <div className="alert alert-danger mt-2">
                        { error }
                    </div> 
                ) 

            }

            {
                successMessage && (
                    <div className="alert alert-success mt-2">
                        { successMessage }
                    </div>
                )
            }

            
        </div>
    );
}

export default TodoForm;