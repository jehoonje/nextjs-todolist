import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, reset } from '../store/counterSlice';
import styles from '../styles/TodoList.module.scss';

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  console.log("쇼딘 : ",styles);  // 전체 styles 객체 출력

  
  return (
    <div className={styles.counter}>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
};

export default Counter;
