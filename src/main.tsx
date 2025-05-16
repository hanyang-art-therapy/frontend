import App from '@/App';
import { Toaster } from '@/components/ui/sonner';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster position='top-center' richColors />
  </StrictMode>
);
