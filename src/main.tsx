import React from 'react';
import ReactDOM from 'react-dom/client';
import Life from './Life.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Life cols={40} rows={31} />
  </React.StrictMode>
);
