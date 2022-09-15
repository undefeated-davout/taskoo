import { useContext, useState } from 'react';

import { UserContext } from 'pages/_app';

import AddTaskRoutineForm from 'components/molecules/tasks/AddTaskRoutineForm';

import { addTaskType } from 'types/task';

import { addTaskWithOrder } from 'lib/api/task';
import { KanbanTaskContext } from 'lib/contexts/KanbanTaskContextProvider';

type AddTaskFormProps = {
  kanbanStatusID: string;
  isMini?: boolean;
  autoFocus?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

const AddTaskForm = (props: AddTaskFormProps) => {
  const { user } = useContext(UserContext);
  const { kanbanTask } = useContext(KanbanTaskContext);

  const [inputValue, setInputValue] = useState('');

  if (user === null) return <></>;
  if (kanbanTask === null) return <></>;

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return;

    if (inputValue.trim() === '') return;

    const newTask: addTaskType = {
      statusID: props.kanbanStatusID,
      title: inputValue.trim(),
      isChecked: false,
    };

    addTaskWithOrder(
      user.uid,
      props.kanbanStatusID,
      [newTask],
      kanbanTask.taskOrderID,
      kanbanTask.statusIDTasks,
      false,
    );
    setInputValue('');
  };

  return (
    <AddTaskRoutineForm
      title="ENTER YOUR TASK"
      autoFocus={props.autoFocus}
      onBlur={props.onBlur}
      inputValue={inputValue}
      handleTextFieldChange={handleTextFieldChange}
      handleKeyDown={handleKeyDown}
    />
  );
};

export default AddTaskForm;
