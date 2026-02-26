import { useEffect } from 'react';
import { AppRoutes } from './routes';
import { useAuthStore } from './store/auth.store';

const App = () => {
  useEffect(() => {
    void useAuthStore.getState().bootstrapSession();
  }, []);

  return <AppRoutes />;
};

export default App;
