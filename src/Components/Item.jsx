import React, {useEffect, useState} from 'react';

function Item({id, item, title, caption, categories, isFinished, completeTodo, activateTodo}) {
    const [isCompleted, setIsCompleted] = useState(isFinished);

    function handleComplete() {
        // Checking old state. What was it
        !isCompleted ? completeTodo() : activateTodo()
        setIsCompleted(!isCompleted)
    }

    return (
        <div
            className={`p-5 bg-white shadow flex rounded-md select-none cursor-pointer cursor-move`}>
            <div className="selector mr-3">
                <input onChange={handleComplete} checked={isCompleted} type="checkbox"/>
            </div>
            <div className="info">
                <h2 className="font-semibold">{title}</h2>
                <h2 className="text-gray-500 mt-1">{caption}</h2>
                <div className="flex space-x-2">
                    {categories.map(category => (
                        <h2 key={category.id}
                            className="border rounded inline-block px-1 border-gray-300 cursor-pointer hover:bg-gray-100 duration-100 mt-2">{category.title}</h2>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Item;