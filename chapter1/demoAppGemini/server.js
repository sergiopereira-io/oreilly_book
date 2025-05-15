const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// --- Mock Database (in-memory) ---
let tasks = [
  { id: '1', title: 'Learn React', instructions: 'Step 1: Study.\nStep 2: Practice.', timestamp: new Date().toISOString() },
  { id: '2', title: 'Build UI', instructions: 'Step 1: Design.\nStep 2: Code.', timestamp: new Date().toISOString() },
  { id: '3', title: 'Deploy App', instructions: 'Step 1: Build.\nStep 2: Deploy.', timestamp: new Date().toISOString() },
];

// --- OpenAI API Integration (Conceptual) ---
const openai = require('openai');
const openaiClient = new openai.OpenAI({
  apiKey: '_OPENAI_API_KEY_',
});

async function getInstructionsFromOpenAI(taskTitle) {
  try {
    const completion = await openaiClient.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Provide step-by-step instructions for: ${taskTitle}` }],
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return "Error: Could not retrieve instructions.";
  }
}

// --- API Endpoints ---

// Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/api/tasks', async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  // const instructions = await getInstructionsFromOpenAI(title);
  const instructions = "Step 1: Do this. Step 2: Do that.";

  const newTask = {
    id: String(Date.now()),
    title,
    instructions,
    timestamp: new Date().toISOString(),
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Move task
app.post('/api/tasks/move/:id', (req, res) => {
  const { id } = req.params;
  const { newList } = req.body;

  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (!['todo', 'inProgress', 'done'].includes(newList)) {
    return res.status(400).json({ error: 'Invalid list name' });
  }

  const updatedTask = { ...tasks[taskIndex], list: newList };
  tasks[taskIndex] = updatedTask;

  res.json(updatedTask);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});