import { useContext, useState } from 'react';

import { UserContext } from 'pages/_app';

import AddTaskRoutineForm from 'components/molecules/tasks/AddTaskRoutineForm';

import { addRoutineType } from 'types/routine';

import { addRoutine } from 'lib/api/routine';

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

    const newRoutine: addRoutineType = {
      title: inputValue.trim(),
    };

    addRoutine(user.uid, newRoutine);
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
