export const safeLocalStorage = {
    setItem: (key: string, value: string) => {
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          localStorage.setItem(key, value);
        } catch (error) {
          console.error('Error setting localStorage item:', error);
        }
      }
    },
    getItem: (key: string) => {
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          return localStorage.getItem(key);
        } catch (error) {
          console.error('Error getting localStorage item:', error);
        }
      }
      return null;
    },
    removeItem: (key: string) => {
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          localStorage.removeItem(key);
        } catch (error) {
          console.error('Error removing localStorage item:', error);
        }
      }
    },
  };
  