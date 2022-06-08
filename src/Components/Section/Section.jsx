import React from 'react';
import Item from "../Item";

function Section({id, data, title, activateTodo, completeTodo, categories}) {
    return (
        <div className={`todos space-y-3 mt-5`}>
            <h2 className="text-xl font-semibold">{title}</h2>

            {data.map(todo => (
                <Item item={todo} key={todo.id} id={todo.id} title={todo.title} caption={todo.caption}
                      isFinished={todo.isFinished} completeTodo={() => completeTodo(todo)}
                      activateTodo={() => activateTodo(todo)
                      }
                      categories={categories.filter(category => todo.categories.includes(category.id))}
                />
            ))}
        </div>
    );
}

export default Section;