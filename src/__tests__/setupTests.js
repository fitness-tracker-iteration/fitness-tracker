// src/setupTests.js
// src/setupTests.js
import '@testing-library/jest-dom/extend-expect';
import { configure } from '@testing-library/react';
import { JSDOM } from 'jsdom';

// Set up JSDOM
// const { document } = new JSDOM('<!doctype html><html><body></body></html>').window;
const dom = new JSDOM('<!doctype html><html><body></body></html>').window;
// global.document = document;
global.document = dom.window.document;
// global.window = document.defaultView;
global.window = dom.window;

global.navigator = { userAgent: 'node.js' };

// Configure React Testing Library to use JSDOM
configure({ testIdAttribute: 'data-testid' });