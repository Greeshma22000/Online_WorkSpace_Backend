const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const workspaceRoutes = require('./routes/workspaces');
const taskRoutes = require('./routes/tasks');
const chatRoutes = require('./routes/chat');
const documentRoutes = require('./routes/documents');

const { setupSocketHandlers } = require('./socket/socketHandlers');
const { setupWebRTCHandlers } = require('./socket/webrtcHandlers');
const { setupYWebSocket } = require('./yjs/yWebSocketServer');

const app = express();
const server = http.createServer(app);

const defaultOrigins = [
  'http://localhost:3000'
];
const envOrigins = ('http://localhost:3000' || process.env.FRONTEND_URL || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const allowedOrigins = envOrigins.length ? envOrigins : defaultOrigins;

const PORT = process.env.PORT || 5000;