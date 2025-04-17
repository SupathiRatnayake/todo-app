import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from '../pages/HomePage';
import TodosPage from '../pages/TodosPage';
import Layout from '../shared/components/Layout';
import ProfilePage from '../pages/ProfilePage';
import UserForm from '../features/auth/components/UserForm';
import { UserProvider } from '../features/auth/context/UserContext';
import { Auth0ProviderWithConfig } from '../features/auth/services/auth0';
import UserCard from '../features/auth/components/UserCard';

function App() {

  return (
	<Auth0ProviderWithConfig>
		<UserProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<HomePage />} />
						<Route path='todos' element={<TodosPage />} />	{/*protect */}
						<Route path='profile' element={<UserCard />} />	{/*protect */}
						<Route path='profile/create' element={<UserForm />} />	{/*protect */}
					</Route>
				</Routes>
			</BrowserRouter>
		</UserProvider>
	</Auth0ProviderWithConfig>
  );
}

export default App
