import { useContext, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { UserContext } from 'pages/_app';

import TaskRoutine from 'components/molecules/tasks/TaskRoutine';

import EditTaskForm from 'containers/organisms/tasks/EditTaskForm';

import { DnDItems, DropTaskResult } from 'types/task';
import { taskType, updateTaskType } from 'types/task';

import { deleteTaskWithOrder, updateTaskWithOrder } from 'lib/api/task';
import { kanbanStatusConst, taskRoutineTypeConst } from 'lib/constants/task';
import { KanbanTaskContext } from 'lib/contexts/KanbanTaskContextProvider';
import { calcStatusIDTasks } from 'lib/models/task';

type TaskProps = {
  isMini?: boolean;
  displayToolButton: boolean;
  isDraggable?: boolean;
  task: taskType;
};

const Task = (props: TaskProps) => {
  const { user } = useContext(UserContext);
  const { setTasks, setTaskOrder, kanbanTask, setKanbanTask } = useContext(KanbanTaskContext);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const ref = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);

  const userID = user!.uid;

  // --- ドラッグ設定 ---
  const [collected, drag] = useDrag(
    () => ({
      type: DnDItems.Task,
      collect: (monitor) => ({ dragging: monitor.isDragging() }),
      end: (_, monitor) => {
        const dropResult = monitor.getDropResult() as DropTaskResult;
        if (!dropResult || !kanbanTask) return;
        let updatedTask: updateTaskType = {};
        if (dropResult.panelID !== props.task.statusID) {
          // パネル間移動
          updatedTask = { statusID: dropResult.panelID };
          updatedTask =
            dropResult.panelID === kanbanStatusConst.done
              ? { isChecked: true, ...updatedTask }
              : { isChecked: false, ...updatedTask };
        }
        const newStatusIDTasks = calcStatusIDTasks(
          props.task.id,
          dropResult.taskID ?? '',
          dropResult.isSetNext,
          dropResult.panelID,
          props.task.statusID,
          updatedTask,
          kanbanTask.statusIDTasks,
        );
        setKanbanTask({
          taskOrderID: kanbanTask.taskOrderID,
          statusIDTasks: newStatusIDTasks,
        });
        updateTaskWithOrder(userID, props.task.id, updatedTask, kanbanTask.taskOrderID, newStatusIDTasks);
        setTasks(undefined);
        setTaskOrder(undefined);
      },
    }),
    [kanbanTask],
  );
  const { dragging } = collected;

  // --- ドロップ設定 ---
  const [, drop] = useDrop(() => ({
    accept: DnDItems.Task,
    drop: (_, monitor) => {
      const hoverRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      if (!mousePosition) return;
      const hoverClientY = mousePosition.y - hoverRect.top;
      const isSetNext = hoverClientY >= hoverMiddleY;
      return {
        panelID: props.task.statusID,
        taskID: props.task.id,
        isSetNext: isSetNext,
      };
    },
  }));
  drag(drop(ref));

  // チェックボックスON/OFF
  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (kanbanTask === null) return;
    let updatedTask: updateTaskType = { isChecked: event.target.checked };
    const newStatusIDTasks = calcStatusIDTasks(
      props.task.id,
      '',
      false,
      props.task.statusID,
      props.task.statusID,
      updatedTask,
      kanbanTask.statusIDTasks,
    );
    setKanbanTask({
      taskOrderID: kanbanTask.taskOrderID,
      statusIDTasks: newStatusIDTasks,
    });
    updateTaskWithOrder(user!.uid, props.task.id, updatedTask, kanbanTask.taskOrderID, newStatusIDTasks);
    setTasks(undefined);
    setTaskOrder(undefined);
  };

  // 削除ボタン押下時
  const handleDeleteButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (kanbanTask === null) return;
    deleteTaskWithOrder(user!.uid, props.task, kanbanTask.taskOrderID, kanbanTask.statusIDTasks);
    setTasks(undefined);
    setTaskOrder(undefined);
  };

  return (
    <>
      {/* タスク要素 */}
      <div ref={props.isDraggable ? ref : undefined}>
        <TaskRoutine
          isMini={props.isMini}
          displayToolButton={props.displayToolButton}
          isChecked={props.task.isChecked}
          title={props.task.title}
          taskRoutineType={
            props.task.routineID === undefined ? taskRoutineTypeConst.task : taskRoutineTypeConst.routineTask
          }
          dragging={dragging}
          handleChangeCheckbox={handleChangeCheckbox}
          handleTitleButton={() => setIsOpenForm(true)}
          handleDeleteButton={handleDeleteButton}
        />
      </div>

      {/* 詳細編集フォーム */}
      <EditTaskForm task={props.task} isOpen={isOpenForm} onClose={() => setIsOpenForm(false)} />
    </>
  );
};

export default Task;
