import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import Layout from './Pages/Layout';
import ErrorPage from './Pages/ErrorPage';

import EmployeeList from './Pages/Employees/EmployeeList';
import EmployeeCreator from './Pages/Employees/EmployeeCreator';
import EmployeeUpdater from './Pages/Employees/EmployeeUpdater';
import EmployeeSearch from './Pages/Employees/EmployeeSearch';
import EmployeeMissing from './Components/Employees/EmployeeMissing';

import EquipmentList from './Pages/Equipment/EquipmentList';
import EquipmentCreator from './Pages/Equipment/EquipmentCreator';
import EquipmentUpdater from './Pages/Equipment/EquipmentUpdater';

import './index.css';
import TableTest from './Pages/Testing/TableTest';
import FormTest from './Pages/Testing/FormTest';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <EmployeeList />,
      },
      {
        path: '/create',
        element: <EmployeeCreator />,
      },
      {
        path: '/update/:id',
        element: <EmployeeUpdater />,
      },
      {
        path: '/search/:search',
        element: <EmployeeSearch />,
      },
      {
        path: '/missing',
        element: <EmployeeMissing />,
      },
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
      {
        path: '/table-test',
        element: <TableTest />,
      },
      {
        path: '/form-test',
        element: <FormTest />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
