import { ChangeEvent, useContext, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useRecoilState, useRecoilValue } from 'recoil';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

import { UtilContext } from 'pages/_app';

import BaseCheckbox from 'components/atoms/BaseCheckbox';
import EditTaskForm from 'components/organisms/tasks/EditTaskForm';

import { DnDItems, DropResult } from 'types/kanban';
import { taskType, updateTaskType } from 'types/task';

import { deleteTaskWithOrder, updateTask } from 'lib/api/task';
import { kanbanStatusConst } from 'lib/constants/kanban';
import { droppedKanbanPanelState } from 'lib/recoil/droppedKanbanPanel';
import { kanbanTaskState } from 'lib/recoil/kanbanTask';

type TaskProps = {
  isMini?: boolean;
  displayDeleteButton?: boolean;
  isDraggable?: boolean;
  task: taskType;
};

const Task = (props: TaskProps) => {
  const { user } = useContext(UtilContext);
  const kanbanTask = useRecoilValue(kanbanTaskState);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // --- ドラッグ設定 ---
  const [_, setDroppedColumnNumber] = useRecoilState(droppedKanbanPanelState);
  const [collected, drag] = useDrag(() => ({
    type: DnDItems.Task,
    collect: (monitor) => ({ dragging: monitor.isDragging() }),
    end: (_, monitor) => {
      const dropResult = monitor.getDropResult() as DropResult;
      if (!dropResult) return;
      setDroppedColumnNumber({
        panelID: dropResult.panelID,
        taskID: dropResult.taskID,
      });
      let editTask: updateTaskType = {};
      if (dropResult.panelID !== props.task.statusID) {
        if (dropResult.panelID === kanbanStatusConst.done) {
          editTask = { isDone: true, ...editTask };
        } else {
          editTask = {
            statusID: dropResult.panelID,
            isDone: false,
            ...editTask,
          };
        }
      }
      updateTask(user!.uid, props.task.id, editTask);
    },
  }));
  const { dragging } = collected;

  // --- ドロップ設定 ---
  const [, drop] = useDrop(() => ({
    accept: DnDItems.Task,
    drop: () => ({
      panelID: props.task.statusID,
      taskID: props.task.id,
    }),
  }));
  drag(drop(ref));

  const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    updateTask(user!.uid, props.task.id, { isDone: event.target.checked });
  };

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
        {!props.isMini && (
          <BaseCheckbox
            checked={props.task.isDone}
            onChange={handleChangeCheckbox}
          />
        )}

        <Button
          disableRipple
          sx={{
            height: '100%',
            width: '100%',
            justifyContent: 'flex-start',
            textTransform: 'none',
            '&:hover': { backgroundColor: 'transparent' },
          }}
          onClick={() => setIsOpenForm(true)}
        >
          <Typography
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              fontSize: 16,
            }}
          >
            {props.task.title}
          </Typography>
        </Button>

        {(!props.isMini || props.displayDeleteButton) && (
          <CardActions sx={{ pl: 0 }}>
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
