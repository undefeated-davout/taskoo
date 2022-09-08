import { useContext, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { UserContext } from 'pages/_app';

import TaskRoutine from 'components/molecules/tasks/TaskRoutine';

import { DropRoutineResult } from 'types/routine';
import { routineType } from 'types/routine';
import { DnDItems } from 'types/task';

import { deleteRoutine } from 'lib/api/routine';

type RoutineProps = {
  routine: routineType;
};

const Routine = (props: RoutineProps) => {
  const { user } = useContext(UserContext);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const ref = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);

  const userID = user!.uid;

  // --- ドラッグ設定 ---
  const [collected, drag] = useDrag(
    () => ({
      type: DnDItems.Routine,
      collect: (monitor) => ({ dragging: monitor.isDragging() }),
      end: (_, monitor) => {
        const DropTaskResult = monitor.getDropResult() as DropRoutineResult;
      },
    }),
    [],
  );
  const { dragging } = collected;

  // --- ドロップ設定 ---
  const [, drop] = useDrop(() => ({
    accept: DnDItems.Routine,
    drop: (_, monitor) => {
      const hoverRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      if (!mousePosition) return;
      const hoverClientY = mousePosition.y - hoverRect.top;
      const isSetNext = hoverClientY >= hoverMiddleY;
      return {
        routineID: props.routine.id,
        isSetNext: isSetNext,
      };
    },
  }));
  drag(drop(ref));

  // 削除ボタン押下時
  const handleDeleteButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    deleteRoutine(userID, props.routine.id);
  };

  return (
    <>
      {/* タスク要素 */}
      <div ref={ref}>
        <TaskRoutine
          displayToolButton={true}
          title={props.routine.title}
          dragging={dragging}
          handleChangeCheckbox={() => {}}
          handleTitleButton={() => setIsOpenForm(true)}
          handleDeleteButton={handleDeleteButton}
        />
      </div>

      {/* 詳細編集フォーム */}
      {/* <EditTaskForm task={props.task} isOpen={isOpenForm} onClose={() => setIsOpenForm(false)} /> */}
    </>
  );
};

export default Routine;
