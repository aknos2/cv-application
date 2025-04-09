import { useState } from 'react';

export function useSaveIndication(initialSavedState = false) {
  const [isSaved, setIsSaved] = useState(initialSavedState);
    
  const showSaveIndication = () => {
    setIsSaved(true);
  };
  
  return {
    isSaved,
    showSaveIndication
  };
}