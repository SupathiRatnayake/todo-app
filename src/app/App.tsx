import { RouterProvider } from 'react-router-dom';
import './App.css';
import { UserProvider } from '../features/auth/context/UserContext';
import { Auth0ProviderWithConfig } from '../features/auth/services/auth0';
import router from './Router';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
	<Auth0ProviderWithConfig>
		<UserProvider>
			<RouterProvider router={router} />
			<ToastContainer position="bottom-right" autoClose={3000} />
		</UserProvider>
	</Auth0ProviderWithConfig>
  );
}

export default App
