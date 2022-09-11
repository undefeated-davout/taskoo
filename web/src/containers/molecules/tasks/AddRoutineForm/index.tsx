import { useContext, useState } from 'react';

import { UserContext } from 'pages/_app';

import AddTaskRoutineForm from 'components/molecules/tasks/AddTaskRoutineForm';

import { addRoutineType } from 'types/routine';

import { addRoutineWithOrder } from 'lib/api/routine';
import { RoutineContext } from 'lib/contexts/RoutineContextProvider';

type AddRoutineFormProps = {};

const AddRoutineForm = (props: AddRoutineFormProps) => {
  const { user } = useContext(UserContext);
  const { routineStatus } = useContext(RoutineContext);
  const [inputValue, setInputValue] = useState('');

  if (user === null) return <></>;
  if (routineStatus === null) return <></>;

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return;

    if (inputValue.trim() === '') return;

    const newRoutine: addRoutineType = {
      title: inputValue.trim(),
    };

    addRoutineWithOrder(user.uid, [newRoutine], routineStatus?.routineOrderID, routineStatus.sortedRoutines);
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
