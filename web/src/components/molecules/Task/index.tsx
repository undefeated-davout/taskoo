import { ChangeEvent, useContext, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useRecoilState } from 'recoil';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

import { UtilContext } from 'pages/_app';

import BaseCheckbox from 'components/atoms/BaseCheckbox';
import EditTaskForm from 'components/organisms/EditTaskForm';

import { DnDItems, DropResult } from 'types/kanban';
import { taskType, updateTaskType } from 'types/task';

import { deleteTask, updateTask } from 'lib/api/task';
import { droppedKanbanPanelState } from 'lib/recoil/droppedKanbanPanel';

type TaskProps = {
  isMini?: boolean;
  task: taskType;
};

const Task = (props: TaskProps) => {
  const { user } = useContext(UtilContext);
  const [isOpenForm, setIsOpenForm] = useState(false);

  // --- ドラッグ設定 ---
  const [_, setDroppedColumnNumber] = useRecoilState(droppedKanbanPanelState);
  const [collected, drag] = useDrag(() => ({
    type: DnDItems.Task,
    collect: (monitor) => ({ dragging: monitor.isDragging() }),
    end: (_, monitor) => {
      const dropResult = monitor.getDropResult() as DropResult;
      if (!dropResult) return;
      setDroppedColumnNumber(dropResult.panelID);
      // パネルを移動したら更新
      const statusID = props.task.isDone ? '80' : props.task.statusID; // 完了ならDONEに読み替え
      if (dropResult.panelID !== statusID) {
        if (dropResult.panelID === '80') {
          const editTask: updateTaskType = { isDone: true };
          updateTask(user!.uid, props.task.id, editTask);
        } else {
          const editTask: updateTaskType = {
            statusID: dropResult.panelID,
            isDone: false,
          };
          updateTask(user!.uid, props.task.id, editTask);
        }
      }
    },
  }));
  const { dragging } = collected;

  const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    const editTask: updateTaskType = { isDone: event.target.checked };
    updateTask(user!.uid, props.task.id, editTask);
  };

  const handleDeleteButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    deleteTask(user!.uid, props.task.id);
  };

  return (
    <>
      {/* タスク要素 */}
      <Card
        ref={drag}
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

        {!props.isMini && (
          <CardActions sx={{ pl: 0 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ maxWidth: 20, minWidth: 20 }}
              onClick={handleDeleteButton}
            >
              <DeleteOutlineIcon sx={{ m: 0 }} />
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
