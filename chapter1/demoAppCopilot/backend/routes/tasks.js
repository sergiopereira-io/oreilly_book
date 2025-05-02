const express = require('express');
const { addTask, getTasks } = require('../db/database');
const axios = require('axios');
const router = express.Router();

// OpenAI API Configuration
const OPENAI_API_KEY = '_OPENAI_API_KEY_';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

router.post('/', async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Task title is required' });
  }

  try {
    // Fetch instructions from OpenAI
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo', // Or 'gpt-4' if available
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: `Provide step-by-step instructions for: ${title}` }
        ],
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    // Safely extract the instructions from the response
    const instructions = response.data?.choices?.[0]?.message?.content?.trim();
    if (!instructions) {
      throw new Error('Invalid response from OpenAI API');
    }

    const timestamp = new Date();

    // Save task to database
    const task = { title, instructions, timestamp };
    addTask(task);

    res.status(201).json(task);
  } catch (error) {
    console.error('Error fetching instructions from OpenAI:', error.message);
    res.status(500).json({ error: 'Failed to fetch instructions from OpenAI' });
  }
});

router.get('/', (req, res) => {
  const tasks = getTasks();
  res.json(tasks);
});

module.exports = router;