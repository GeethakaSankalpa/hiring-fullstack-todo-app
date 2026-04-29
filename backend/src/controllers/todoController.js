import Todo from '../models/Todo.js';

/**
 * @desc    Get all todos
 * @route   GET /api/todos
 */
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch todos' });
  }
};

/**
 * @desc    Create a new todo
 * @route   POST /api/todos
 */
export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const todo = await Todo.create({
      title,
      description,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create todo' });
  }
};

/**
 * @desc    Update a todo
 * @route   PUT /api/todos/:id
 */
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.title = title ?? todo.title;
    todo.description = description ?? todo.description;

    const updatedTodo = await todo.save();

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update todo' });
  }
};

/**
 * @desc    Toggle todo done status
 * @route   PATCH /api/todos/:id/done
 */
export const toggleTodoDone = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.done = !todo.done;

    const updatedTodo = await todo.save();

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to toggle todo status' });
  }
};

/**
 * @desc    Delete a todo
 * @route   DELETE /api/todos/:id
 */
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await todo.deleteOne();

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete todo' });
  }
};