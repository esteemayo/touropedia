import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PrivateRoute from 'utils/PrivateRoute';
import ProtectedRoute from 'utils/ProtectedRoute';
import {
  AddEditTour,
  Dashboard,
  Error,
  Home,
  Layout,
  Login,
  Register,
  SingleTour,
  TagTours,
} from 'pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/tours/search' element={<Home />} />
          <Route path='/tours/tag/:tag' element={<TagTours />} />
          <Route
            path='login'
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='register'
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='add-tour'
            element={
              <PrivateRoute>
                <AddEditTour />
              </PrivateRoute>
            }
          />
          <Route
            path='edit-tour/:id'
            element={
              <PrivateRoute>
                <AddEditTour />
              </PrivateRoute>
            }
          />
          <Route path='tour/:id' element={<SingleTour />} />
          <Route
            path='dashboard'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
