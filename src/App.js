import React, { useEffect } from 'react';
import TodoList from './Todo/Todolist.js';
import Context from './context.js';
// import AddTodo from './Todo/AddTodo.js'; //якщо не loading
import Loader from './Loader.js';
import Modal from './Modal/Modal.js';

const AddTodo = React.lazy(() => import('./Todo/AddTodo.js')); // робимо ліниву загрузку компоненту AddTodo

function App() {
  const [todos, setTodos] = React.useState([]); //* використовуєм якщо з бекендом jsonplaceholder
  const [loading, setLoading] = React.useState(true); //*створюєм стейт для слідкуванням за loading (лоудінгом)
  // const [todos, setTodos] = React.useState([   //* використовуєм якщо без бекенду
  //   { id: 1, comleted: false, title: 'купити хліб' },
  //   { id: 2, comleted: true, title: 'купити кефір' },
  //   { id: 3, comleted: false, title: 'купити фрукти' },
  // ]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/?_limit=5')
      .then(response => response.json())
      .then(todos =>
        setTimeout(() => {
          //симулюєм затримку сервера на 2с
          setTodos(todos);
          setLoading(false);
        }, 2000),
      );
  }, []);

  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.comleted = !todo.comleted;
        }
        return todo;
      }),
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }
  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          comleted: false,
        },
      ]),
    );
  }
  return (
    <Context.Provider value={{ removeTodo: removeTodo }}>
      <div className="wrapper">
        <h1>React tutorial</h1>

        <Modal />

        <React.Suspense fallback={<Loader />}>
          {/* React.Suspense - огортає той компонент який потрібно завантажити ліниво lazy loader */}
          <AddTodo onCreate={addTodo} />
        </React.Suspense>
        {loading && <Loader />}
        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
          <p>No todos!</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
