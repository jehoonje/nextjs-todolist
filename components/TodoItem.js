import { useState } from 'react';
import styles from '../styles/TodoList.module.scss';

const TodoItem = ({ todo, handleDelete, handleAddDetail }) => {
  const [showDetailInput, setShowDetailInput] = useState(false);
  const [detail, setDetail] = useState('');
  const [details, setDetails] = useState(todo.details || []);
  const [isAddingDetail, setIsAddingDetail] = useState(false);

  const handleToggleDetail = () => {
    setShowDetailInput(!showDetailInput);
  };

  const handleAddNewDetail = () => {
    if (detail.trim() !== '') {
      const newDetails = [...details, detail];
      setDetails(newDetails);
      handleAddDetail(todo.id, newDetails);
      setDetail('');
    }
  };

  const handleToggleAddDetailInput = () => {
    setIsAddingDetail(!isAddingDetail);
  };

  const handleDeleteDetail = (index) => {
    const updatedDetails = details.filter((_, i) => i !== index);
    setDetails(updatedDetails);
    handleAddDetail(todo.id, updatedDetails); // 부모 컴포넌트로 업데이트된 디테일 전달
  };

  return (
    <>
      <li className={styles.todoItem}>
        <div className={styles.todoContent}>
          <span>{todo.task}</span>
          <div className={styles.todoButtons}>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
            <button onClick={handleToggleDetail}>
              {showDetailInput ? 'Hide Details' : 'View Details'}
            </button>
            <button onClick={handleToggleAddDetailInput}>
              {isAddingDetail ? 'Cancel Detail' : 'Add Detail'}
            </button>
          </div>
        </div>
      </li>

      {/* 디테일 목록 표시 */}
      {showDetailInput && (
        <div className={styles.detailsContainer}>
          <ul>
            {details.map((detailItem, index) => (
              <li key={index} className={styles.detailItem}>
                {detailItem}
                <button onClick={() => handleDeleteDetail(index)}>Delete Detail</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 디테일 추가 입력창 */}
      {isAddingDetail && (
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="Add a detail"
          />
          <button onClick={handleAddNewDetail}>Add</button>
        </div>
      )}
    </>
  );
};

export default TodoItem;
