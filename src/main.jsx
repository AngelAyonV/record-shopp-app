import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../Styles.css';
import RecordShoppApp from './RecordShoppApp.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecordShoppApp />
  </StrictMode>
);
