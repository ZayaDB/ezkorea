import { useState } from 'react';

export function useSelectionHandler<T>(initialSelections: T[] = []) {
  const [selections, setSelections] = useState<T[]>(initialSelections);

  const toggleSelection = (item: T) => {
    const index = selections.indexOf(item);
    if (index === -1) {
      setSelections([...selections, item]);
    } else {
      setSelections(selections.filter((_, i) => i !== index));
    }
  };

  return { selections, toggleSelection, setSelections };
}
