import { StoreProvider } from 'app/providers/StoreProvider';
import ReactDom from 'react-dom/client';
import App from './app/App';


const root = ReactDom.createRoot(document.getElementById('root'));

root.render(
  <StoreProvider>
    <App/>
  </StoreProvider>
);
