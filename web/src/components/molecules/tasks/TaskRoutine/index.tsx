import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import BaseCheckbox from 'components/atoms/BaseCheckbox';

import { taskRoutineType } from 'types/task';

import { taskRoutineTypeConst } from 'lib/constants/task';

type TaskProps = {
  isMini?: boolean;
  displayToolButton: boolean;
  isChecked: boolean;
  title: string;
  taskRoutineType: taskRoutineType;
  dragging: boolean;
  handleChangeCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTitleButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleDeleteButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const TaskRoutine = (props: TaskProps) => {
  const theme = useTheme();

  const isInconspicuous = (): boolean => {
    return (
      props.isChecked &&
      (props.taskRoutineType === taskRoutineTypeConst.task ||
        props.taskRoutineType === taskRoutineTypeConst.routineTask)
    );
  };

  const disableColorJudge = () => (isInconspicuous() ? theme.palette.action.disabled : undefined);

  return (
    <>
      {/* タスク要素 */}
      <Box sx={{ pt: 1 }}>
        <Card
          sx={{
            height: 36,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: isInconspicuous() ? theme.palette.action.disabledBackground : undefined,
            outline:
              props.taskRoutineType === taskRoutineTypeConst.routineTask
                ? `1.5px solid ${isInconspicuous() ? '#2E7D32' : theme.palette.success.main}`
                : undefined,
            opacity: props.dragging ? 0.3 : 1,
            '&:hover': { cursor: 'pointer' },
          }}
        >
          {(!props.isMini || props.displayToolButton) && (
            <BaseCheckbox
              sx={{
                p: props.isMini ? '4px' : undefined,
                color: disableColorJudge(),
              }}
              checked={props.isChecked}
              onChange={props.handleChangeCheckbox}
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
            onClick={props.handleTitleButton}
          >
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Typography
                sx={{
                  height: '100%',
                  fontSize: 16,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  color: disableColorJudge(),
                }}
              >
                {props.title}
              </Typography>
            </Box>
          </Button>

          {(!props.isMini || props.displayToolButton) && (
            <CardActions sx={{ p: props.isMini ? 0 : undefined }}>
              <Button color="primary" sx={{ maxWidth: 32, minWidth: 32 }} onClick={props.handleDeleteButton}>
                <DeleteOutlineIcon fontSize="small" sx={{ m: 0, color: disableColorJudge() }} />
              </Button>
            </CardActions>
          )}
        </Card>
      </Box>
    </>
  );
};

export default TaskRoutine;
