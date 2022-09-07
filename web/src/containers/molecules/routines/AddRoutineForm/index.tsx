import { useContext, useState } from 'react';

import { UserContext } from 'pages/_app';

import AddTaskRoutineForm from 'components/molecules/tasks/AddTaskRoutineForm';

type AddRoutineFormProps = {};

const AddRoutineForm = (props: AddRoutineFormProps) => {
  const { user } = useContext(UserContext);
  const [inputValue, setInputValue] = useState('');

  if (user === null) return <></>;

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return;

    if (inputValue.trim() === '') return;

    console.log('inputValue', inputValue);

    setInputValue('');
  };

  return (
    <AddTaskRoutineForm
      title="ENTER YOUR ROUTINE"
      inputValue={inputValue}
      handleTextFieldChange={handleTextFieldChange}
      handleKeyDown={handleKeyDown}
    />
  );
};

export default AddRoutineForm;
