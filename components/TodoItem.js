import styles from '../styles/TodoList.module.scss';

const TodoItem = ({ todo, handleDelete }) => {
  return (
    <li className={todo.completed ? styles.completed : ''}>
      <span>{todo.task}</span>
      <button onClick={() => handleDelete(todo.id)}>Delete</button>
    </li>
  );
};

export default TodoItem;
