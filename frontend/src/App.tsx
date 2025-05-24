import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router';
import Layout from './layouts/Layout';
import Register from './pages/Register';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <Layout>
              <p>Home Page</p>
            </Layout>
          }
        />
        <Route
          path='/search'
          element={
            <Layout>
              <p>Search Page</p>
            </Layout>
          }
        />
        <Route
          path='/register'
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
}
