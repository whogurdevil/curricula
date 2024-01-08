// CreateNewEntityButton.tsx
import React from 'react';

type CreateNewEntityButtonProps = {
  attributes: Record<string, string>;
  onSubmit: (newData: Record<string, string>) => void;
};

const CreateNewEntityButton: React.FC<CreateNewEntityButtonProps> = ({ attributes, onSubmit }) => {
  const handleSubmit = () => {
    const newData: Record<string, string> = {};
    Object.keys(attributes).forEach((key) => {
      newData[key] = ''; // You may want to initialize this with default values or provide a proper form input
    });

    onSubmit(newData);
  };

  return (
    <button onClick={handleSubmit}>
      Create New Entity
    </button>
  );
};

export default CreateNewEntityButton;
