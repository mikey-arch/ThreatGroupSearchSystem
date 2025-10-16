import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../../src/components/Sidebar';

//Helper to wrap up component in Router for testing link components
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Sidebar Component', () => {
  //Test that the main header/title is rendered
  it('renders the header title', () => {
    renderWithRouter(<Sidebar />);

    expect(screen.getByText('Threat Groups')).toBeDefined();
  });

  //Test that the home naviagtion link exists and points to /
  it('renders Home navigation link', () => {
    renderWithRouter(<Sidebar />);

    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toBeDefined();
    expect(homeLink?.getAttribute('href')).toBe('/');
  });

  //Test that the Browse Groups naviagtion item exists 
  it('renders Browse Groups navigation item', () => {
    renderWithRouter(<Sidebar />);

    expect(screen.getByText('Browse Groups')).toBeDefined();
  });

  //Test that the About Crow link exists and points to /about
  it('renders About CROW navigation link', () => {
    renderWithRouter(<Sidebar />);

    const aboutLink = screen.getByText('About CROW').closest('a');
    expect(aboutLink).toBeDefined();
    expect(aboutLink?.getAttribute('href')).toBe('/about');
  });

  //Test that all main navigation items are rendered
  it('renders all navigation items', () => {
    renderWithRouter(<Sidebar />);

    expect(screen.getByText('Home')).toBeDefined();
    expect(screen.getByText('Browse Groups')).toBeDefined();
    expect(screen.getByText('About CROW')).toBeDefined();
  });
});
