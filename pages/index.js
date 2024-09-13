import { useEffect, useState } from 'react';
import TodoList from '../components/TodoList';
import styles from '../styles/TodoList.module.scss';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  // 브라우저에서만 localStorage에 접근
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleAddDetail = (id, newDetails) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, details: newDetails };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleEditTodo = (id, updatedTask) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task: updatedTask } : todo
    );
    setTodos(updatedTodos);
  };

  const handleAddTodo = () => {
    if (newTask.trim() === "") {
      alert("Please enter a valid task");
      return;
    }
    const newTodo = {
      id: Date.now(),
      task: newTask,
      completed: false,
      details: [],
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTask('');
  };

  const handleReload = () => {
    window.location.reload(); // 새로고침
  };

  return (
    <>
      <div onClick={handleReload} className={styles.counter}>
        <h1>DREAM BIG, START SMALL, ACT NOW.</h1>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // 기본 동작 방지
              handleAddTodo();
            }
          }}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <TodoList
        todos={todos}
        handleDelete={handleDelete}
        handleAddDetail={handleAddDetail}
        handleEditTodo={handleEditTodo}
      />
    </>
  );
}








// 서버 저장버전 //
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import TodoList from '../components/TodoList';
// import { fetchTodos, deleteTodo } from '../store/todoSlice';
// import styles from '../styles/TodoList.module.scss';

// export default function Home() {
//   const dispatch = useDispatch();
//   const todos = useSelector((state) => state.todos.items);
//   const status = useSelector((state) => state.todos.status);
//   const [newTask, setNewTask] = useState("");

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchTodos());
//     }
//   }, [status, dispatch]);

//   // 할 일 추가 함수
//   const handleAddTodo = async () => {
//     const response = await fetch('/api/todos', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ task: newTask }),
//     });

//     if (response.ok) {
//       const addedTodo = await response.json();
//       // 새로운 할 일을 todos 상태에 추가
//       dispatch({ type: 'todos/addTodo', payload: addedTodo });
//       setNewTask(''); // 입력 필드 초기화
//     }
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteTodo(id));
//   };

//   return (
//     <>
//     <div className={styles.counter}>
//       <h1>Todo List</h1>
//       <input
//         type="text"
//         value={newTask}
//         onChange={(e) => setNewTask(e.target.value)}
//         placeholder="Enter a new task"
//       />
//       <button onClick={handleAddTodo}>Add Todo</button>
//     </div>
//       <TodoList todos={todos} handleDelete={handleDelete} />
//     </>
//   );
// }
