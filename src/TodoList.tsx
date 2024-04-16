import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../src/store';
import { toggleTodo, Todo, VisibilityFilter, setFilter } from '../src/features/todoSlice';
import { FaRegCheckCircle, FaCheckCircle } from 'react-icons/fa';

const TodoList: React.FC = () => {
    const todos: Todo[] = useSelector((state: RootState) => state.todos.filteredTodos);
    const filter: VisibilityFilter = useSelector((state: RootState) => state.todos.filter);
    const dispatch = useDispatch();
    const [hasInitialData, setHasInitialData] = useState<boolean>(false);
    console.log(todos);

    useEffect(() => {
        dispatch(setFilter(filter));
        if (todos.length > 0) {
            setHasInitialData(true);
        }
    }, [filter, dispatch, todos.length]);

    const handleToggle = (id: number) => {
        dispatch(toggleTodo(id));
        dispatch(setFilter(filter));
    };

    const activeTodos = todos.filter(todo => !todo.completed);

    return (
        <div>
            {!hasInitialData && todos.length == 0 ? "" : (
                <div className="my-2 bg-white rounded-md drop-shadow-lg py-1">
                    <ul>
                        {todos.map((todo: Todo, index: number) => (
                            <li
                                className={`p-3 border-b flex items-center ${index === todos.length - 1 ? 'border-none' : ''}`}
                                key={todo.id}
                                onClick={() => handleToggle(todo.id)}
                                style={{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? 'gray' : 'initial' }}
                            >
                                <div className="flex items-center space-x-4">
                                    <span> {todo.completed ? <FaCheckCircle style={{ fontSize: 20, color: "green" }} /> : <FaRegCheckCircle style={{ fontSize: 20 }} />}</span>
                                    <span>{todo.text}</span>
                                </div>
                            </li>
                        ))}
                        {todos.length == 0 && filter === VisibilityFilter.SHOW_ACTIVE && <div className='p-3'>You have finish all task</div>}
                        {todos.length == 0 && filter === VisibilityFilter.SHOW_COMPLETED && <div className='p-3'>You have't finish any task</div>}

                    </ul>
                </div>
            )}
            {hasInitialData && (
                <div className="flex bg-white p-2 drop-shadow-lg items-center rounded-md">
                    <div className="w-2/6">
                        <span>{activeTodos.length} items left</span>
                    </div>
                    <div className="flex space-x-4">
                        <span className={`py-[3px] px-2 rounded-md ${filter === VisibilityFilter.SHOW_ALL ? ' border border-red-500' : ''}`} onClick={() => dispatch(setFilter(VisibilityFilter.SHOW_ALL))}>All</span>
                        <span className={`py-[3px] px-2 rounded-md ${filter === VisibilityFilter.SHOW_ACTIVE ? 'border border-red-500' : ''}`} onClick={() => dispatch(setFilter(VisibilityFilter.SHOW_ACTIVE))}>Active</span>
                        <span className={`py-[3px] px-2 rounded-md ${filter === VisibilityFilter.SHOW_COMPLETED ? 'border border-red-500' : ''}`} onClick={() => dispatch(setFilter(VisibilityFilter.SHOW_COMPLETED))}>Complete</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TodoList;
