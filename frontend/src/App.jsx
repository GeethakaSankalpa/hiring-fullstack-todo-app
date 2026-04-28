import { useEffect, useState, useCallback } from 'react';
import { getTodos } from './services/api';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

let toastId = 0;

function App() {
  const [todos, setTodos]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchErr, setFetchErr] = useState('');
  const [toasts, setToasts]   = useState([]);

  const fetchTodos = useCallback(async () => {
    try {
      const res = await getTodos();
      setTodos(res.data);
      setFetchErr('');
    } catch (err) {
      setFetchErr(err?.response?.data?.message || 'Could not load tasks. Is the server running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTodos(); }, [fetchTodos]);

  const addToast = (message, type = 'success') => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  };

  const onSuccess = (msg) => { fetchTodos(); addToast(msg, 'success'); };
  const onError   = (msg) => addToast(msg, 'error');

  const done      = todos.filter((t) => t.done).length;
  const today     = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <div className="app">
      <h1 className="app-title">My Tasks</h1>
      <p className="app-sub">{today} &nbsp;·&nbsp; {done}/{todos.length} done</p>

      <TodoForm onAdd={(msg) => onSuccess(msg)} onError={onError} />

      {loading && <div className="state-msg state-loading">Loading…</div>}
      {!loading && fetchErr && <div className="state-msg state-error">{fetchErr}</div>}
      {!loading && !fetchErr && (
        <TodoList todos={todos} onChange={fetchTodos} onError={onError} />
      )}

      {/* toasts */}
      <div className="toasts">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`}>
            <span>{t.message}</span>
            <button onClick={() => setToasts((p) => p.filter((x) => x.id !== t.id))}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;