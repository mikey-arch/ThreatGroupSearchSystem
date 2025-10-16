import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../src/components/SearchBar';

describe('SearchBar Component', () => {
  //Test that the search input renders with the default placeholder
  it('renders search input with placeholder', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search threat groups...');
    expect(input).toBeDefined();
  });

  //test that the search input renders with a custom placeholder
  it('renders with custom placeholder', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} placeholder="Custom placeholder" />);

    const input = screen.getByPlaceholderText('Custom placeholder');
    expect(input).toBeDefined();
  });

  //Test that submitting the form calls onSearch with the entered value 
  it('calls onSearch when form is submitted', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search threat groups...');
    const form = input.closest('form')!;

    // Type into the input
    fireEvent.change(input, { target: { value: 'Lazarus' } });

    // Submit the form
    fireEvent.submit(form);

    // Check if onSearch was called with the correct value
    expect(mockOnSearch).toHaveBeenCalledWith('Lazarus');
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  //test that submitting an empty input still calls onSearch with an empty string
  it('submits empty string when input is empty', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search threat groups...');
    const form = input.closest('form')!;

    // Submit without typing
    fireEvent.submit(form);

    expect(mockOnSearch).toHaveBeenCalledWith('');
  });

  //Test that user input updates the input field value
  it('accepts user input', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search threat groups...') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'APT28' } });

    //Verify the input value is updated
    expect(input.value).toBe('APT28');
  });
});
