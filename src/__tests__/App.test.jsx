import React from "react";
import { render, screen } from '@testing-library/react';
import { Router, MemoryRouter, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../components/App';
import Login from "../components/Login";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('App component', () => {
  it('renders Login component for default route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
       <App />
    </MemoryRouter>);
  })
  expect(screen.getByTestId('login-component')).toBeInTheDocument();
});