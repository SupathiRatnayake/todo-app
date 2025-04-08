import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './App.css'
import HomePage from '../pages/Home';
import TodosPage from '../pages/TodosPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/todos",
    element: <TodosPage />,
  },
  
]);

function App() {

  return (
  <RouterProvider router={router} />
  )
}

export default App
