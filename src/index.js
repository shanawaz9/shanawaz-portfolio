import React from 'react';
import ReactDOM from 'react-dom/client';
import './fonts';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// Dev-only accessibility auditing — logs WCAG/contrast violations to the console.
if (process.env.NODE_ENV !== 'production') {
  import('@axe-core/react').then(({ default: axe }) => {
    axe(React, ReactDOM, 1000);
  });
}
