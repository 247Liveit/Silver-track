import AppProvider from './providers/app-provider';
import AppRouter from './routes';

export default function App() {
  return (
    <AppProvider>      
        <AppRouter />
    </AppProvider>
  );
}
