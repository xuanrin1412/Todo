import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { VisibilityFilter, addTodo, setFilter } from '../src/features/todoSlice';

const TodoForm: React.FC = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim() !== '') {
            dispatch(addTodo(text));
            dispatch(setFilter(VisibilityFilter.SHOW_ALL));
            setText('');
        }
    };
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='drop-shadow-lg'>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What needs to be done?"
                className="rounded-md p-3 w-full"
                onKeyPress={handleKeyPress}
            />

        </form>
    );
};

export default TodoForm;
