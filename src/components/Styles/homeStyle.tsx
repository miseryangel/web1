import { makeStyles } from '@material-ui/core/styles';
import yellow from "@material-ui/core/colors/yellow";

export const useStyles = makeStyles((theme:any) => ({
    root: {
      ...theme.typography.body2,
      margin:theme.spacing(5),
      padding: theme.spacing(1),
      textAlign: 'center',
      height:"70vh",
      color: theme.palette.text.secondary,
    }
  }));