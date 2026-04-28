import { useState } from 'react';
import { createTodo } from '../services/api';

function TodoForm({ onAdd, onError }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) { onError('Title is required'); return; }

    setLoading(true);
    try {
      await createTodo({ title: title.trim(), description: description.trim() });
      setTitle('');
      setDescription('');
      onAdd('Task added');
    } catch (err) {
      onError(err?.response?.data?.message || 'Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? '…' : 'Add'}
        </button>
      </div>
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
      />
    </form>
  );
}

export default TodoForm;