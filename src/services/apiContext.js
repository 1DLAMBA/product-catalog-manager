import React, { createContext, useContext, useState, useCallback } from 'react';

// Create the context
const ApiContext = createContext();

// Provider component
export const ApiProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async (params) => {
    setLoading(true);
    setError(null);

    try {
      const queryString = new URLSearchParams({
        ...params,
        ...(params.filters || {}),
      }).toString();
  
      const response = await fetch(`http://3.88.1.181:8000/products/public/catalog?${queryString}`);
      const data = await response.json();
      setProducts(data);
    } catch (err) { 
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ApiContext.Provider value={{ products, loading, error, fetchProducts }}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook to use the API context
export const useApi = () => {
  return useContext(ApiContext);
};
