import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import ErrorPage from './Pages/ErrorPage';

import LayoutEmployee from './Pages/Layout/LayoutEmployee';
import EmployeeList from './Pages/EmployeeList';
import EmployeeCreator from './Pages/EmployeeCreator';
import EmployeeUpdater from './Pages/EmployeeUpdater';

import LayoutEquipment from './Pages/Layout/LayoutEquipment';
import EquipmentList from './Pages/EquipmentList';
import EquipmentCreator from './Pages/EquipmentCreator';
import EquipmentUpdater from './Pages/EquipmentUpdater';

import TableTest from './Pages/TableTest';
import FormTest from './Pages/FormTest';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutEmployee />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <EmployeeList />,
      },
      {
        path: '/create-employee',
        element: <EmployeeCreator />,
      },
      {
        path: '/update-employee/:id',
        element: <EmployeeUpdater />,
      },
    ],
  },
  {
    path: '/',
    element: <LayoutEquipment />,
    children: [
      {
        path: '/equipment-list',
        element: <EquipmentList />,
      },
      {
        path: '/create-equipment',
        element: <EquipmentCreator />,
      },
      {
        path: '/update-equipment/:id',
        element: <EquipmentUpdater />,
      },
    ],
  },
  {
    path: '/table-test',
    element: <TableTest />,
  },
  {
    path: '/form-test',
    element: <FormTest />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals(); // console.log
