import React from 'react';
import {createRoot} from 'react-dom/client';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import {Api} from './ApiComponent.jsx';
import {Test} from './TestComponent.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Api/>
    },
    {
        path: '/test',
        element: <Test/>
    }
]);
const root = createRoot(document.getElementById('root'));

root.render(<RouterProvider router={router}/>);