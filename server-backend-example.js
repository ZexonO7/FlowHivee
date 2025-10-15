// Example Node.js backend endpoints for your FlowHivee server
// Add these to your existing Node.js backend

const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(express.json());

const MESSAGES_FILE = path.join(__dirname, 'data', 'community-messages.json');

// Initialize default messages if file doesn't exist
const initializeMessages = async () => {
  try {
    await fs.access(MESSAGES_FILE);
  } catch {
    const defaultMessages = [
      {
        id: '1',
        author: 'Sarah K.',
        initials: 'SK',
        time: '5 min ago',
        timestamp: Date.now() - 5 * 60000,
        message: 'Just finished the Algebra quiz! Who else found question 7 tricky? 🤔',
        likes: 12,
        likedBy: [],
        replies: 3,
      },
      {
        id: '2',
        author: 'Mike R.',
        initials: 'MR',
        time: '23 min ago',
        timestamp: Date.now() - 23 * 60000,
        message: 'The Water Cycle lesson was so interesting! I learned so much about evaporation and precipitation ✨',
        likes: 8,
        likedBy: [],
        replies: 5,
      },
      {
        id: '3',
        author: 'Emma T.',
        initials: 'ET',
        time: '1 hour ago',
        timestamp: Date.now() - 60 * 60000,
        message: 'Can someone explain the Pythagorean theorem in simple terms? Need help with my homework 📐',
        likes: 15,
        likedBy: [],
        replies: 7,
      },
    ];
    await fs.mkdir(path.dirname(MESSAGES_FILE), { recursive: true });
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(defaultMessages, null, 2));
  }
};

// GET all messages
app.get('/api/community/messages', async (req, res) => {
  try {
    const data = await fs.readFile(MESSAGES_FILE, 'utf8');
    const messages = JSON.parse(data);
    res.json(messages);
  } catch (error) {
    console.error('Error reading messages:', error);
    res.status(500).json({ error: 'Failed to load messages' });
  }
});

// POST new message
app.post('/api/community/messages', async (req, res) => {
  try {
    const { author, initials, message } = req.body;
    
    const data = await fs.readFile(MESSAGES_FILE, 'utf8');
    const messages = JSON.parse(data);
    
    const newMessage = {
      id: Date.now().toString(),
      author,
      initials,
      time: 'Just now',
      timestamp: Date.now(),
      message,
      likes: 0,
      likedBy: [],
      replies: 0,
    };
    
    messages.unshift(newMessage);
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));
    
    res.json(newMessage);
  } catch (error) {
    console.error('Error posting message:', error);
    res.status(500).json({ error: 'Failed to post message' });
  }
});

// POST toggle like
app.post('/api/community/messages/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    
    const data = await fs.readFile(MESSAGES_FILE, 'utf8');
    const messages = JSON.parse(data);
    
    const message = messages.find(m => m.id === id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    if (message.likedBy.includes(userId)) {
      message.likedBy = message.likedBy.filter(uid => uid !== userId);
      message.likes--;
    } else {
      message.likedBy.push(userId);
      message.likes++;
    }
    
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));
    res.json(message);
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ error: 'Failed to toggle like' });
  }
});

// Initialize and start server
initializeMessages().then(() => {
  app.listen(3000, () => {
    console.log('Community API running on port 3000');
  });
});
