import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Comments from '../components/Comments';

describe('Comments Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('renders the empty state when there are no comments', () => {
    render(<Comments modelId="test-id" />);
    expect(screen.getByText('Nenhuma avaliação ainda.')).toBeInTheDocument();
  });

  it('can open the form, submit a comment and render it', async () => {
    render(<Comments modelId="test-id" />);
    
    // Open the form
    await act(async () => {
      await userEvent.click(screen.getByText('Deixar minha opinião'));
    });
    
    // Fill required fields
    const nameInput = screen.getByPlaceholderText('Seu nome');
    const emailInput = screen.getByPlaceholderText('seu@email.com');
    const prosInput = screen.getByPlaceholderText('O que você mais gostou?');

    await act(async () => {
      await userEvent.type(nameInput, 'João Silva');
      await userEvent.type(emailInput, 'joao@example.com');
      await userEvent.type(prosInput, 'Rodinhas muito boas!');
    });

    // Submit
    await act(async () => {
      await userEvent.click(screen.getByText('Enviar Avaliação'));
    });

    // Expect alert
    expect(window.alert).toHaveBeenCalledWith('Avaliação enviada com sucesso!');

    // Expect the comment to be rendered
    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('Rodinhas muito boas!')).toBeInTheDocument();
    
    // Form should be closed
    expect(screen.queryByPlaceholderText('Seu nome')).not.toBeInTheDocument();
  });
});
