import { useEffect, useState } from 'react';

interface Args {
  defaultChecked?: boolean;
  handleChange?: (value: boolean) => void;
}
export function useCheckboxManager({
  defaultChecked = false,
  handleChange,
}: Args) {
  const [isChecked, setIsChecked] = useState(defaultChecked);
  function onCheck() {
    if (handleChange) {
      handleChange(!isChecked);
    }
    setIsChecked(!isChecked);
  }

  useEffect(() => {
    setIsChecked(defaultChecked);
  }, [defaultChecked]);

  return {
    checked: isChecked,
    onChange: onCheck,
  };
}
