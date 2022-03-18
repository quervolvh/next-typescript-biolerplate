export const change = (value, field, set) => {
    set((prevState) => ({ ...prevState, [field]: value }));
  };