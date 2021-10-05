import { makeStyles,Theme } from "@material-ui/core/styles";
import yellow from "@material-ui/core/colors/yellow";
import white from "@material-ui/core/colors/yellow";

export const arrayStyles = makeStyles((theme:Theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      outline:"2px solid black",
      "& > *": {
        margin: theme.spacing(0.1),
        width: theme.spacing(5),
        height: theme.spacing(5),
        backgroundColor: yellow[300],
        textAlign: "center",     
        padding: theme.spacing(1)
      },
    },
    textField: {
      marginBottom: theme.spacing(0.5),
    },
    active:{
      backgroundColor: yellow[700],
    },
    transform:{
      background:'linear-gradient(45deg,#9fff80,#3399ff)',
    }
  }));