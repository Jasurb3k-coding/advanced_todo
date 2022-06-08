import React, {useState} from 'react';
import Item from "./Item";
import NewNote from "./NewNote/NewNote";
import Section from "./Section/Section";

const categories = [
    {
        id: 1,
        title: '🎨 Design',
    },
    {
        id: 2,
        title: '💰 Marketing'
    }
]

const todosFromServer = [
    {
        id: 1,
        title: 'Design Sign up flow',
        caption: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        categories: [1],
        isFinished: false
    },
    {
        id: 2,
        title: 'Landing Page Content',
        caption: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        categories: [2],
        isFinished: false
    },
    {
        id: 3,
        title: 'Design use case page',
        caption: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        categories: [2],
        isFinished: true
    },
    {
        id: 4,
        title: 'ReactJS Competition Learning',
        caption: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        categories: [1, 2],
        isFinished: true
    },
    {
        id: 5,
        title: 'NodeJS Ultimate Learning',
        caption: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        categories: [2],
        isFinished: true
    },
]


function Todo(props) {

    const [activeTodos, setActiveTodos] = useState(todosFromServer.filter(todo => !todo.isFinished));
    const [completedTodos, setCompletedTodos] = useState(todosFromServer.filter(todo => todo.isFinished));

    let todoItemCount = todosFromServer.at(-1).id + 1

    function addNewTodo(todo) {
        setActiveTodos(prevState => {
                todo.id = ++todoItemCount;
                return [todo, ...prevState]
            }
        )
    }

    function completeTodo(completed_todo) {
        setActiveTodos(prevState =>
            prevState.filter(todo => todo.id !== completed_todo.id)
        )
        setCompletedTodos(prevState => [{...completed_todo, isFinished:true}, ...prevState])
    }

    function activateTodo(activated_todo) {
        setCompletedTodos(prevState =>
            prevState.filter(todo => todo.id !== activated_todo.id)
        )
        setActiveTodos(prevState => [{...activated_todo, isFinished:false}, ...prevState])
    }

    const sections = [
        {
            id: 1,
            title: '',
            data: activeTodos
        },
        {
            id: 2,
            title: 'Completed Todos',
            data: completedTodos
        },
    ]
    return (
        <div className="w-3/5 mx-auto mt-10 p-5 rounded-xl">
            <h1 className="font-semibold text-2xl">Welcome back, Jasurbek</h1>
            <p className="mt-2 text-gray-600">You've got 7 tasks coming up in the coming days.</p>

            <NewNote categories={categories} addNewTodo={addNewTodo}/>

                {sections.map(section=>(
                    <Section key={section.id} id={section.id} data={section.data} title={section.title} completeTodo={completeTodo} activateTodo={activateTodo} categories={categories}/>
                ))}
        </div>
    );
}

export default Todo;
