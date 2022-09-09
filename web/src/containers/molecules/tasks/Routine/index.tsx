import { useContext, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { UserContext } from 'pages/_app';

import TaskRoutine from 'components/molecules/tasks/TaskRoutine';

import EditRoutineForm from 'containers/organisms/tasks/EditRoutineForm';

import { DropRoutineResult, updateRoutineType } from 'types/routine';
import { routineType } from 'types/routine';
import { DnDItems } from 'types/task';

import { deleteRoutineWithOrder, updateRoutineWithOrder } from 'lib/api/routine';
import { RoutineContext } from 'lib/contexts/RoutineContextProvider';
import { calcRoutines } from 'lib/models/routine';

type RoutineProps = {
  routine: routineType;
};

const Routine = (props: RoutineProps) => {
  const { user } = useContext(UserContext);
  const { setRoutines, setRoutineOrder, routineStatus, setRoutineStatus } = useContext(RoutineContext);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const ref = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);

  const userID = user!.uid;

  // --- ドラッグ設定 ---
  const [collected, drag] = useDrag(
    () => ({
      type: DnDItems.Routine,
      collect: (monitor) => ({ dragging: monitor.isDragging() }),
      end: (_, monitor) => {
        const dropResult = monitor.getDropResult() as DropRoutineResult;
        if (!dropResult || !routineStatus) return;
        const updatedRoutine: updateRoutineType = {};
        const newRoutines = calcRoutines(
          props.routine.id,
          dropResult.routineID,
          dropResult.isSetNext,
          updatedRoutine,
          routineStatus.sortedRoutines,
        );
        setRoutineStatus({
          routineOrderID: routineStatus.routineOrderID,
          sortedRoutines: newRoutines,
        });
        setRoutines(undefined);
        setRoutineOrder(undefined);
        updateRoutineWithOrder(userID, props.routine.id, updatedRoutine, routineStatus.routineOrderID, newRoutines);
      },
    }),
    [routineStatus],
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
    if (routineStatus === null) return;
    setRoutines(undefined);
    setRoutineOrder(undefined);
    deleteRoutineWithOrder(userID, props.routine.id, routineStatus.routineOrderID, routineStatus.sortedRoutines);
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
      <EditRoutineForm routine={props.routine} isOpen={isOpenForm} onClose={() => setIsOpenForm(false)} />
    </>
  );
};

export default Routine;
