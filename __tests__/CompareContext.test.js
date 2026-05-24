import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CompareProvider, useCompare } from '../context/CompareContext';
import { getTodosModelos } from '../lib/data';

const TestComponent = () => {
  const { compareList, toggleCompare, removeFromCompare, clearCompare } = useCompare();
  const modelos = getTodosModelos().slice(0, 4);

  return (
    <div>
      <div data-testid="count">{compareList.length}</div>
      {modelos.map(m => (
        <button key={m.id} data-testid={`toggle-${m.id}`} onClick={() => toggleCompare(m)}>
          Toggle {m.id}
        </button>
      ))}
      <button data-testid="clear" onClick={clearCompare}>Clear</button>
    </div>
  );
};

describe('CompareContext', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('should start with 0 items', () => {
    render(
      <CompareProvider>
        <TestComponent />
      </CompareProvider>
    );
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('should add an item when toggled', async () => {
    render(
      <CompareProvider>
        <TestComponent />
      </CompareProvider>
    );
    const modelos = getTodosModelos();
    
    await act(async () => {
      await userEvent.click(screen.getByTestId(`toggle-${modelos[0].id}`));
    });

    expect(screen.getByTestId('count')).toHaveTextContent('1');
  });

  it('should remove an item when toggled twice', async () => {
    render(
      <CompareProvider>
        <TestComponent />
      </CompareProvider>
    );
    const modelos = getTodosModelos();
    
    await act(async () => {
      await userEvent.click(screen.getByTestId(`toggle-${modelos[0].id}`));
    });
    expect(screen.getByTestId('count')).toHaveTextContent('1');

    await act(async () => {
      await userEvent.click(screen.getByTestId(`toggle-${modelos[0].id}`));
    });
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('should not allow more than 3 items', async () => {
    render(
      <CompareProvider>
        <TestComponent />
      </CompareProvider>
    );
    const modelos = getTodosModelos().slice(0, 4);
    
    for (let i = 0; i < 4; i++) {
      await act(async () => {
        await userEvent.click(screen.getByTestId(`toggle-${modelos[i].id}`));
      });
    }

    expect(screen.getByTestId('count')).toHaveTextContent('3');
    expect(window.alert).toHaveBeenCalledWith('Você pode comparar no máximo 3 patins por vez.');
  });
});
