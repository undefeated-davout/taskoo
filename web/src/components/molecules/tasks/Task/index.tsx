import { ChangeEvent, useContext, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

import { UserContext } from 'pages/_app';

import BaseCheckbox from 'components/atoms/BaseCheckbox';
import { KanbanTaskContext } from 'components/contexts/KanbanTaskContextProvider';
import EditTaskForm from 'components/organisms/tasks/EditTaskForm';

import { DnDItems, DropResult } from 'types/kanban';
import { taskType, updateTaskType } from 'types/task';

import { deleteTaskWithOrder, updateTaskWithOrder } from 'lib/api/task';
import { kanbanStatusConst } from 'lib/constants/kanban';
import { calcStatusIDTasks } from 'lib/models/task';

type TaskProps = {
  isMini?: boolean;
  displayToolButton: boolean;
  isDraggable?: boolean;
  task: taskType;
};

const Task = (props: TaskProps) => {
  const { user } = useContext(UserContext);
  const { kanbanTask, setKanbanTask } = useContext(KanbanTaskContext);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const ref = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);

  const userID = user!.uid;

  // --- ドラッグ設定 ---
  const [collected, drag] = useDrag(
    () => ({
      type: DnDItems.Task,
      collect: (monitor) => ({ dragging: monitor.isDragging() }),
      end: (_, monitor) => {
        const dropResult = monitor.getDropResult() as DropResult;
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
        updateTaskWithOrder(
          userID,
          props.task.id,
          updatedTask,
          kanbanTask.taskOrderID,
          newStatusIDTasks,
        );
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
  const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
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
    updateTaskWithOrder(
      user!.uid,
      props.task.id,
      updatedTask,
      kanbanTask.taskOrderID,
      newStatusIDTasks,
    );
  };

  // 削除ボタン押下時
  const handleDeleteButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (kanbanTask === null) return;
    deleteTaskWithOrder(
      user!.uid,
      props.task,
      kanbanTask.taskOrderID,
      kanbanTask.statusIDTasks,
    );
  };

  return (
    <>
      {/* タスク要素 */}
      <Card
        ref={props.isDraggable ? ref : undefined}
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          opacity: dragging ? 0.3 : 1,
          '&:hover': { cursor: 'pointer' },
        }}
      >
        {(!props.isMini || props.displayToolButton) && (
          <BaseCheckbox
            sx={{ p: props.isMini ? '4px' : undefined }}
            checked={props.task.isChecked}
            onChange={handleChangeCheckbox}
          />
        )}

        <Button
          disableRipple
          sx={{
            p: props.displayToolButton ? 0 : undefined,
            height: '100%',
            width: '100%',
            justifyContent: 'flex-start',
            textTransform: 'none',
            '&:hover': { backgroundColor: 'transparent' },
          }}
          onClick={() => setIsOpenForm(true)}
        >
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <Typography
              sx={{
                height: '100%',
                fontSize: props.isMini ? 15 : 18,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {props.task.title}
            </Typography>
          </Box>
        </Button>

        {(!props.isMini || props.displayToolButton) && (
          <CardActions sx={{ p: props.isMini ? 0 : undefined }}>
            <Button
              color="primary"
              sx={{ maxWidth: 32, minWidth: 32 }}
              onClick={handleDeleteButton}
            >
              <DeleteOutlineIcon fontSize="small" sx={{ m: 0 }} />
            </Button>
          </CardActions>
        )}
      </Card>

      {/* 詳細編集フォーム */}
      <EditTaskForm
        task={props.task}
        isOpen={isOpenForm}
        onClose={() => setIsOpenForm(false)}
      />
    </>
  );
};

export default Task;
