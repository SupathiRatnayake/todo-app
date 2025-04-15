import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from '../pages/HomePage';
import TodosPage from '../pages/TodosPage';
import Layout from '../shared/components/Layout';
import ProfilePage from '../pages/ProfilePage';
import UserForm from '../features/auth/components/UserForm';
import { Auth0Provider } from '@auth0/auth0-react';
import { UserProvider } from '../features/auth/context/UserContext';

function App() {

  return (
	<Auth0Provider 
		domain='dev-nv4345c1szg142mz.us.auth0.com'
		clientId='RjSqk3XLutH7jGJ2mdvyBRk7Jyjuo3vY'
		authorizationParams={{ redirect_uri: window.location.origin }}
	>
		<UserProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<HomePage />} />
						<Route path='todos' element={<TodosPage />} />	{/*protect */}
						<Route path='profile' element={<ProfilePage />} />	{/*protect */}
						<Route path='create-user' element={<UserForm />} />	{/*protect */}
					</Route>
				</Routes>
			</BrowserRouter>
		</UserProvider>
	</Auth0Provider>
  );
}

export default App
