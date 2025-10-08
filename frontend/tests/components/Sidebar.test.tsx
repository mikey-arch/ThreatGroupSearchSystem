import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../../src/components/Sidebar';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Sidebar Component', () => {
  it('renders the header title', () => {
    renderWithRouter(<Sidebar />);

    expect(screen.getByText('Threat Groups')).toBeDefined();
  });

  it('renders Home navigation link', () => {
    renderWithRouter(<Sidebar />);

    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toBeDefined();
    expect(homeLink?.getAttribute('href')).toBe('/');
  });

  it('renders Browse Groups navigation item', () => {
    renderWithRouter(<Sidebar />);

    expect(screen.getByText('Browse Groups')).toBeDefined();
  });

  it('renders About CROW navigation link', () => {
    renderWithRouter(<Sidebar />);

    const aboutLink = screen.getByText('About CROW').closest('a');
    expect(aboutLink).toBeDefined();
    expect(aboutLink?.getAttribute('href')).toBe('/about');
  });

  it('renders all navigation items', () => {
    renderWithRouter(<Sidebar />);

    expect(screen.getByText('Home')).toBeDefined();
    expect(screen.getByText('Browse Groups')).toBeDefined();
    expect(screen.getByText('About CROW')).toBeDefined();
  });
});
