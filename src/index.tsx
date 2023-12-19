import { createRoot } from 'react-dom/client';
import App from './App';

// const root = document.getElementById('root');
const root = document.querySelector('#root');

if (root) {
  createRoot(root).render(<App />);
}
