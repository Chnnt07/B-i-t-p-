import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key);

    if (savedValue !== null) {
      return JSON.parse(savedValue);
    }

    return initialValue;
  });

  const setStoredValue = (newValue) => {
    setValue((currentValue) => {
      const valueToStore =
        typeof newValue === "function"
          ? newValue(currentValue)
          : newValue;

      localStorage.setItem(key, JSON.stringify(valueToStore));

      return valueToStore;
    });
  };

  return [value, setStoredValue];
}

export default useLocalStorage;