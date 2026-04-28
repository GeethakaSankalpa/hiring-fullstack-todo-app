import express from 'express';
import {
  getTodos,
  createTodo,
  updateTodo,
  toggleTodoDone,
  deleteTodo,
} from '../controllers/todoController.js';

const router = express.Router();

// GET /api/todos - get all todos
router.get('/', getTodos);

// POST /api/todos - create a new todo
router.post('/', createTodo);

// PUT /api/todos/:id - update title/description
router.put('/:id', updateTodo);

// PATCH /api/todos/:id/done - toggle done status
router.patch('/:id/done', toggleTodoDone);

// DELETE /api/todos/:id - delete todo
router.delete('/:id', deleteTodo);

export default router;