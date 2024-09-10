import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoList from '../components/TodoList';
import { fetchTodos, deleteTodo } from '../store/todoSlice';

export default function Home() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const status = useSelector((state) => state.todos.status);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  // 할 일 추가 함수
  const handleAddTodo = async () => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task: newTask }),
    });

    if (response.ok) {
      const addedTodo = await response.json();
      // 새로운 할 일을 todos 상태에 추가
      dispatch({ type: 'todos/addTodo', payload: addedTodo });
      setNewTask(''); // 입력 필드 초기화
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a new task"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <TodoList todos={todos} handleDelete={handleDelete} />
    </div>
  );
}
