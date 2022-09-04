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

type TaskProps = {
  isMini?: boolean;
  displayToolButton?: boolean;
  isDraggable?: boolean;
  task: taskType;
};

const Task = (props: TaskProps) => {
  const { user } = useContext(UserContext);
  const { kanbanTask } = useContext(KanbanTaskContext);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const userID = user!.uid;

  // --- ドラッグ設定 ---
  const [collected, drag] = useDrag(
    () => ({
      type: DnDItems.Task,
      collect: (monitor) => ({ dragging: monitor.isDragging() }),
      end: (_, monitor) => {
        const dropResult = monitor.getDropResult() as DropResult;
        if (!dropResult || !kanbanTask) return;
        let editTask: updateTaskType;
        if (dropResult.panelID === props.task.statusID) {
          // パネル内移動
          editTask = {};
        } else {
          // パネル間移動
          editTask = {
            statusID: dropResult.panelID,
            prevStatusID: props.task.statusID,
          };
          if (dropResult.panelID === kanbanStatusConst.done) {
            editTask = { isDone: true, ...editTask };
          } else {
            editTask = { isDone: false, ...editTask };
          }
        }
        updateTaskWithOrder(
          userID,
          props.task.id,
          editTask,
          kanbanTask.taskOrderID,
          kanbanTask.statusIDTasks,
        );
      },
    }),
    [kanbanTask],
  );
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

  // チェックボックスON/OFF
  const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    if (kanbanTask === null) return;
    let updatedTask: updateTaskType = { isDone: event.target.checked };
    if (event.target.checked) {
      updatedTask.statusID = kanbanStatusConst.done;
      updatedTask.prevStatusID = props.task.statusID;
    } else {
      updatedTask.statusID = props.task.prevStatusID;
      updatedTask.prevStatusID = props.task.statusID;
    }
    updateTaskWithOrder(
      user!.uid,
      props.task.id,
      updatedTask,
      kanbanTask?.taskOrderID,
      kanbanTask?.statusIDTasks,
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
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <Typography
              sx={{
                height: '100%',
                fontSize: 16,
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
