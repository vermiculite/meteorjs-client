
const sinon = require('sinon');
const chai = require('chai');
const should = chai.should();
const mockWebSocket = require('mock-socket').WebSocket;
const mockServer = require('mock-socket').Server;

global.sinon = sinon;
global.should = should;
global.WebSocket = mockWebSocket;
global.SocketServer = mockServer;

