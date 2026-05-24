"use client";

import { createContext, useState, useContext, useEffect } from 'react';

const CompareContext = createContext();

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('rollref_compare');
    if (saved) {
      try {
        setCompareList(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save to localStorage when updated
  useEffect(() => {
    localStorage.setItem('rollref_compare', JSON.stringify(compareList));
  }, [compareList]);

  const toggleCompare = (patins) => {
    setCompareList((prev) => {
      const exists = prev.find(p => p.id === patins.id);
      if (exists) {
        return prev.filter(p => p.id !== patins.id);
      } else {
        if (prev.length >= 3) {
          alert('Você pode comparar no máximo 3 patins por vez.');
          return prev;
        }
        return [...prev, patins];
      }
    });
  };

  const removeFromCompare = (id) => {
    setCompareList(prev => prev.filter(p => p.id !== id));
  };

  const clearCompare = () => setCompareList([]);

  return (
    <CompareContext.Provider value={{ compareList, toggleCompare, removeFromCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  return useContext(CompareContext);
}
