import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../src/store';
import { toggleTodo, Todo, VisibilityFilter, setFilter, filterTodos } from '../src/features/todoSlice';
import { FaRegCheckCircle, FaCheckCircle } from 'react-icons/fa';

const TodoList: React.FC = () => {
    const todos: Todo[] = useSelector((state: RootState) => state.todos.filteredTodos);
    const filter: VisibilityFilter = useSelector((state: RootState) => state.todos.filter);
    const filteredTodos: Todo[] = useSelector((state: RootState) => state.todos.filteredTodos);
    const dispatch = useDispatch();
    console.log(filteredTodos);

    useEffect(() => {
        dispatch(filterTodos());
    }, [filter, dispatch]);

    const handleToggle = (id: number) => {
        dispatch(toggleTodo(id));
        dispatch(filterTodos());
    };

    const activeTodos = filteredTodos.filter(todo => !todo.completed);
    console.log(activeTodos);

    return (
        <>
            {filteredTodos.length === 0 ? (
                <div></div>
            ) : (
                <div>
                    <div className="my-2 bg-white rounded-md drop-shadow-lg py-1">
                        <ul>
                            {filteredTodos.map((todo: Todo, index: number) => (
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
                        </ul>
                    </div>
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
                </div>
            )}
        </>
    );
};

export default TodoList;
