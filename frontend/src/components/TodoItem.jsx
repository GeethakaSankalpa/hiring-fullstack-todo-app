import { useState } from 'react';
import { toggleTodoDone, updateTodo, deleteTodo } from '../services/api';

function TodoItem({ todo, onChange, onError }) {
  const [editing, setEditing]   = useState(false);
  const [title, setTitle]       = useState(todo.title);
  const [desc, setDesc]         = useState(todo.description || '');
  const [saving, setSaving]     = useState(false);

  const handleToggle = async () => {
    try {
      await toggleTodoDone(todo._id);
      onChange();
    } catch (err) {
      onError(err?.response?.data?.message || 'Failed to update status');
    }
  };

  const handleSave = async () => {
    if (!title.trim()) { onError('Title cannot be empty'); return; }
    setSaving(true);
    try {
      await updateTodo(todo._id, { title: title.trim(), description: desc.trim() });
      setEditing(false);
      onChange();
    } catch (err) {
      onError(err?.response?.data?.message || 'Failed to update task');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setTitle(todo.title);
    setDesc(todo.description || '');
    setEditing(false);
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo._id);
      onChange();
    } catch (err) {
      onError(err?.response?.data?.message || 'Failed to delete task');
    }
  };

  if (editing) {
    return (
      <div className="todo-item editing">
        <div className="edit-inputs">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') handleCancel(); }}
            disabled={saving}
            autoFocus
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') handleCancel(); }}
            disabled={saving}
          />
        </div>
        <div className="edit-actions">
          <button className="btn-save" onClick={handleSave} disabled={saving}>Save</button>
          <button className="btn-cancel" onClick={handleCancel} disabled={saving}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.done ? 'done' : ''}`}>
      <input
        className="todo-check"
        type="checkbox"
        checked={todo.done}
        onChange={handleToggle}
      />
      <div className="todo-body">
        <div className="todo-title">{todo.title}</div>
        {todo.description && <div className="todo-desc">{todo.description}</div>}
      </div>
      <div className="todo-actions">
        {!todo.done && (
          <button className="btn-icon" title="Edit" onClick={() => setEditing(true)}>✎</button>
        )}
        <button className="btn-icon danger" title="Delete" onClick={handleDelete}>✕</button>
      </div>
    </div>
  );
}

export default TodoItem;