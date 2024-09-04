import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { Button, Typography, CircularProgress, Box } from '@mui/material';

const App: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCount = async () => {
    try {
      const result = await backend.getCount();
      setCount(Number(result));
    } catch (error) {
      console.error('Error fetching count:', error);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  const handleIncrement = async () => {
    setLoading(true);
    try {
      const result = await backend.increment();
      setCount(Number(result));
    } catch (error) {
      console.error('Error incrementing count:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setLoading(true);
    try {
      await backend.reset();
      setCount(0);
    } catch (error) {
      console.error('Error resetting count:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen">
      <Typography variant="h2" className="mb-8">Simple Counter App</Typography>
      <Typography variant="h4" className="mb-4">Count: {count !== null ? count : 'Loading...'}</Typography>
      <Box className="flex space-x-4">
        <Button
          variant="contained"
          color="primary"
          onClick={handleIncrement}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Increment'}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleReset}
          disabled={loading}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default App;