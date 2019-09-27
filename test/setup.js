import sinon from 'sinon'
import chai from 'chai'
const should = chai.should();
import {WebSocket as mockWebSocket} from 'mock-socket';
import {Server as mockServer} from 'mock-socket';

global.sinon = sinon;
global.should = should;
global.WebSocket = mockWebSocket;
global.SocketServer = mockServer;
