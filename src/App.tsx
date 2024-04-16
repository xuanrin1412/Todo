import React from 'react';
import { Provider } from 'react-redux';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { store } from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="w-full min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="w-[70%] lg:max-w-[35%]">
          <TodoForm />
          <TodoList />
        </div>
      </div>
    </Provider>
  );
};

export default App;
