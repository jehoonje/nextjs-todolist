import TodoItem from './TodoItem';
import styles from '../styles/TodoList.module.scss';

const TodoList = ({ todos, handleDelete }) => {
  return (
    <ul className={styles.todoList}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} handleDelete={handleDelete} />
      ))}
    </ul>
  );
};

export default TodoList;
