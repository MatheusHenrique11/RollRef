import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import Dashboard from '../src/app/vendedores/dashboard/page';
import NovaPublicacao from '../src/app/vendedores/nova-publicacao/page';

// Mock useRouter
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush
  })
}));

describe('Vendor Dashboard', () => {
  beforeEach(() => {
    jest.spyOn(window, 'confirm').mockImplementation(() => true);
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the dashboard with mock data and calculates stats correctly', () => {
    render(<Dashboard />);
    
    expect(screen.getByText(/Skate Shop Brasil/i)).toBeInTheDocument();
    expect(screen.getByText('Custom Setup - Seba High Light')).toBeInTheDocument();
    expect(screen.getByText('Patins Traxart Black - Usado')).toBeInTheDocument();
    expect(screen.getByText('462')).toBeInTheDocument();
  });

  it('removes an item when the delete button is clicked and confirmed', () => {
    render(<Dashboard />);
    
    expect(screen.getByText('Custom Setup - Seba High Light')).toBeInTheDocument();

    const deleteButtons = screen.getAllByText('Excluir');
    
    fireEvent.click(deleteButtons[0]);

    expect(window.confirm).toHaveBeenCalled();
    expect(screen.queryByText('Custom Setup - Seba High Light')).not.toBeInTheDocument();
  });

  it('renders the nova publicacao form and submits it successfully', async () => {
    jest.useFakeTimers();
    render(<NovaPublicacao />);
    
    const titleInput = screen.getByPlaceholderText('Ex: Custom Setup - Powerslide Next 110');
    const brandInput = screen.getByPlaceholderText('Ex: Powerslide');
    const priceInput = screen.getByPlaceholderText('R$ 0,00');
    const linkInput = screen.getByPlaceholderText('https://wa.me/...');
    
    fireEvent.change(titleInput, { target: { value: 'Meu Patins Custom' } });
    fireEvent.change(brandInput, { target: { value: 'Seba' } });
    fireEvent.change(priceInput, { target: { value: '1500' } });
    fireEvent.change(linkInput, { target: { value: 'https://wa.me/12345678' } });

    const submitBtn = screen.getByText('Publicar Anúncio');
    
    fireEvent.click(submitBtn);

    expect(screen.getByText('Enviando...')).toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('sucesso'));
      expect(mockPush).toHaveBeenCalledWith('/vendedores/dashboard');
    });

    jest.useRealTimers();
  });
});
