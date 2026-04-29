import TodoItem from './TodoItem';

function TodoList({ todos, onChange, onError }) {
  if (!todos.length) {
    return <div className="state-msg state-empty">No tasks yet. Add one above.</div>;
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onChange={onChange}
          onError={onError}
        />
      ))}
    </div>
  );
}

export default TodoList;