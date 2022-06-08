import React, {createRef, useEffect, useRef, useState} from 'react';
import Select from 'react-select'
import todo from "../Todo";

function NewNote({categories, addNewTodo}) {
    const [isWritingMode, setIsWritingMode] = useState(false);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteCaption, setNoteCaption] = useState('');
    const [errors, setErrors] = useState([]);
    const maxInputRef = useRef();
    const categoryRef = useRef();

    const CategoryOptions = categories.map(category => {
        return {
            id: category.id,
            value: category.title,
            label: category.title
        }
    })


    function handleMinimumClick(e) {
        setIsWritingMode(true)
    }

    useEffect(() => {

        maxInputRef.current?.focus()
    }, [isWritingMode]);

    function clearForm() {
        setNoteTitle('')
        setNoteCaption('')
        categoryRef.current.setValue([])
        maxInputRef.current?.focus()
    }

    function addTodo(e) {
        e.preventDefault()
        let newTodo = {
            title: noteTitle,
            caption: noteCaption,
            categories: categoryRef.current.getValue().map(category => category.id),
            isFinished: false
        }
        const validation = validate(newTodo)
        if (validation.is_valid) {
            addNewTodo(newTodo)
            clearForm()
        } else {
            showErrors(validation.errors)
        }
    }

    function showErrors(errors) {
        console.log(errors)
    }

    function validate(newNote) {
        let errors = []

        function validateField(field, error, error_message) {
            if (error) {
                errors.push({
                    field,
                    error_message
                })
            }
        }

        validateField('title', newNote.title.length < 8, 'Your Title is too short')
        validateField('title', newNote.title.length > 32, 'Your Title is too long')
        validateField('caption', newNote.title.length > 500, 'Your Caption is too long')
        validateField('categories', newNote.categories.length === 0, 'Please Select at least 1 Category')
        setErrors(errors)
        return errors ? {is_valid: false, errors} : {is_valid: true}
    }


    if (isWritingMode) {
        return (
            <div className="p-5 pt-5 bg-white shadow rounded-md w-full mt-3 ">
                <form className="info" onSubmit={addTodo}>
                    <error className="text-xs text-red-400 font-semibold">{errors.title}</error>
                    <input ref={maxInputRef} className="bg-inherit outline-none font-semibold w-full py-2"
                           placeholder="Title"
                           type="text" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)}/>
                    <error className="text-xs text-red-400 font-semibold">{errors.caption}</error>
                    <textarea className="bg-inherit outline-none w-full" placeholder="Caption"
                              onChange={(e) => setNoteCaption(e.target.value)} value={noteCaption}/>
                    <error className="text-xs text-red-400 font-semibold">{errors.category}</error>
                    <div className="flex items-center justify-between mt-2">

                        <Select className="min-w-1/4" placeholder="Select a Category" options={CategoryOptions}
                                isMulti ref={categoryRef}/>
                        <button type='submit'
                                className="py-1 px-10 bg-blue-400 text-white rounded-md hover:bg-blue-500">Add
                        </button>
                    </div>
                </form>
            </div>
        )
    } else
        return (
            <input className="bg-inherit outline-none mt-10 w-full" onClick={handleMinimumClick}
                   placeholder="Add a new note..." type="text"/>
        )

}

export default NewNote;