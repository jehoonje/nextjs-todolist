import { useState, useRef, useEffect } from "react";
import styles from "../styles/TodoList.module.scss";

const TodoItem = ({ todo, handleDelete, handleAddDetail, handleEditTodo }) => {
  const [showDetailInput, setShowDetailInput] = useState(false);
  const [detail, setDetail] = useState("");
  const [details, setDetails] = useState(todo.details || []);
  const [isAddingDetail, setIsAddingDetail] = useState(false);
  const [editDetailIndex, setEditDetailIndex] = useState(null); // 수정 중인 디테일의 인덱스
  const [editDetailText, setEditDetailText] = useState(""); // 수정할 디테일 내용

  // useRef를 사용하여 input 요소에 접근
  const detailInputRef = useRef(null);

  const handleToggleDetail = () => {
    setShowDetailInput(!showDetailInput);
    setIsAddingDetail(!isAddingDetail);
  };

  const handleAddNewDetail = () => {
    if (detail.trim() !== "") {
      const newDetails = [...details, detail];
      setDetails(newDetails);
      handleAddDetail(todo.id, newDetails);
      setDetail("");
    }
  };

  const handleEditDetail = (index, text) => {
    setEditDetailIndex(index); // 수정 중인 디테일의 인덱스 설정
    setEditDetailText(text); // 수정할 디테일 내용 설정
  };

  const handleSaveDetailEdit = (index) => {
    const updatedDetails = details.map((item, i) =>
      i === index ? editDetailText : item
    );
    setDetails(updatedDetails);
    handleAddDetail(todo.id, updatedDetails);
    setEditDetailIndex(null); // 수정 모드 종료
  };

  const handleCancelDetailEdit = () => {
    setEditDetailIndex(null); // 수정 모드 종료
  };

  const handleDeleteDetail = (index) => {
    const updatedDetails = details.filter((_, i) => i !== index);
    setDetails(updatedDetails);
    handleAddDetail(todo.id, updatedDetails); // 부모 컴포넌트로 업데이트된 디테일 전달
  };

  // Add Detail 버튼이 눌렸을 때 input에 포커스 설정
  useEffect(() => {
    if (isAddingDetail && detailInputRef.current) {
      detailInputRef.current.focus(); // input에 포커스
    }
  }, [isAddingDetail]);

  return (
    <>
      <li className={styles.todoItem}>
        <div className={styles.todoContent}>
          <span>{todo.task}</span>
          <div className={styles.todoButtons}>
            <button
              onClick={() => {
                if (window.confirm("정말 삭제하시겠습니까?")) {
                  handleDelete(todo.id);
                }
              }}
            >
              Delete
            </button>
            <button onClick={handleToggleDetail}>
              {showDetailInput ? "Hide Details" : "View Details"}
            </button>
          </div>
        </div>
      </li>

      {/* 디테일 목록 표시 */}
      {showDetailInput && (
        <div className={styles.detailsContainer}>
          {details.length > 0 ? (
            <ul>
              {details.map((detailItem, index) => (
                <li key={index} className={styles.detailItem}>
                  {editDetailIndex === index ? (
                    <input
                      type="text"
                      value={editDetailText}
                      onChange={(e) => setEditDetailText(e.target.value)}
                      style={{ width: "100%" }} // input의 너비를 100%로 설정
                    />
                  ) : (
                    <span>{detailItem}</span> // 디테일 내용 표시
                  )}

                  <div className={styles.buttonGroup}>
                    {editDetailIndex === index ? (
                      <>
                        <button onClick={() => handleSaveDetailEdit(index)}>
                          Save
                        </button>
                        <button onClick={handleCancelDetailEdit}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            if (window.confirm("정말 삭제하시겠습니까?")) {
                              handleDeleteDetail(index);
                            }
                          }}
                        >
                          Delete Detail
                        </button>
                        <button
                          onClick={() => handleEditDetail(index, detailItem)}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>내용이 없습니다!</p>
          )}
        </div>
      )}

      {/* 디테일 추가 입력창 */}
      {isAddingDetail && (
        <div className={styles.inputContainer}>
          <input
            ref={detailInputRef} // input에 ref 추가
            type="text"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleAddNewDetail(); // Enter 키를 눌렀을 때 디테일 추가
              }
            }}
            placeholder="Add a detail"
          />
          <button onClick={handleAddNewDetail}>Add</button>
        </div>
      )}
    </>
  );
};

export default TodoItem;
