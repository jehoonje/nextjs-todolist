let todos = [
  { id: 1, task: "Learn Next.js", completed: false },
  { id: 2, task: "Build an app", completed: false },
];

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    // GET 요청: 할 일 목록 반환
    case 'GET':
      res.status(200).json(todos);
      break;

    // POST 요청: 새로운 할 일 추가
    case 'POST':
      const newTodo = {
        id: todos.length + 1,
        task: req.body.task,
        completed: false,
      };
      todos.push(newTodo);
      res.status(201).json(newTodo);
      break;

    // PUT 요청: 할 일 수정
    case 'PUT':
      const { id, completed } = req.body;
      todos = todos.map(todo => todo.id === id ? { ...todo, completed } : todo);
      res.status(200).json({ message: 'Todo updated' });
      break;

    // DELETE 요청: 할 일 삭제
    case 'DELETE':
      const { deleteId } = req.body;
      todos = todos.filter(todo => todo.id !== deleteId);
      res.status(200).json({ message: 'Todo deleted' });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
