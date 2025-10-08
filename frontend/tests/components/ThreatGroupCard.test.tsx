import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ThreatGroupCard from '../../src/components/ThreatGroupCard';

// Helper to render with router
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ThreatGroupCard Component', () => {
  const mockGroup = {
    id: '123',
    title: 'Lazarus Group',
    content: 'North Korean state-sponsored group',
    country: 'North Korea',
    aliases: [
      { name: 'HIDDEN COBRA', source: 'US Government' },
      { name: 'ZINC', source: 'Microsoft' }
    ],
    tags: ['apt', 'north korea', 'financial crime'],
    searchQuery: ''
  };

  it('renders threat group title', () => {
    renderWithRouter(<ThreatGroupCard {...mockGroup} />);

    expect(screen.getByText(/Lazarus Group/)).toBeDefined();
  });

  it('renders description', () => {
    renderWithRouter(<ThreatGroupCard {...mockGroup} />);

    expect(screen.getByText('North Korean state-sponsored group')).toBeDefined();
  });

  it('displays country flag for North Korea', () => {
    renderWithRouter(<ThreatGroupCard {...mockGroup} />);

    // Flag emoji should be rendered
    const card = screen.getByText('Lazarus Group').closest('a');
    expect(card?.textContent).toContain('🇰🇵');
  });

  it('displays all aliases comma-separated', () => {
    renderWithRouter(<ThreatGroupCard {...mockGroup} />);

    expect(screen.getByText(/Aliases:/)).toBeDefined();
    expect(screen.getByText(/HIDDEN COBRA, ZINC/)).toBeDefined();
  });

  it('displays first 3 tags', () => {
    renderWithRouter(<ThreatGroupCard {...mockGroup} />);

    expect(screen.getByText('apt')).toBeDefined();
    expect(screen.getByText('north korea')).toBeDefined();
    expect(screen.getByText('financial crime')).toBeDefined();
  });

  it('shows +count badge when more than 3 tags', () => {
    const groupWithManyTags = {
      ...mockGroup,
      tags: ['apt', 'north korea', 'financial crime', 'ransomware', 'wannacry']
    };

    renderWithRouter(<ThreatGroupCard {...groupWithManyTags} />);

    expect(screen.getByText('+2')).toBeDefined();
  });

  it('renders as a link to profile page', () => {
    renderWithRouter(<ThreatGroupCard {...mockGroup} />);

    const link = screen.getByText('Lazarus Group').closest('a');
    expect(link?.getAttribute('href')).toBe('/profile/123');
  });

  it('handles missing optional fields gracefully', () => {
    const minimalGroup = {
      id: '456',
      title: 'Test Group',
      content: 'Test description'
    };

    renderWithRouter(<ThreatGroupCard {...minimalGroup} />);

    expect(screen.getByText('Test Group')).toBeDefined();
    expect(screen.getByText('Test description')).toBeDefined();
  });

  it('shows default flag when country is unknown', () => {
    const groupNoCountry = { ...mockGroup, country: 'Unknown' };
    renderWithRouter(<ThreatGroupCard {...groupNoCountry} />);

    const card = screen.getByText('Lazarus Group').closest('a');
    expect(card?.textContent).toContain('🏴');
  });
});
