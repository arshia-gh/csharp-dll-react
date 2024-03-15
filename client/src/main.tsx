import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import bootstrap, { Bindings } from 'wasm-bindings';

Bindings.getFrontendName = () => 'Browser';
Bindings.onMainInvoked.subscribe(console.log);

bootstrap.boot().then(() =>
  ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
);

