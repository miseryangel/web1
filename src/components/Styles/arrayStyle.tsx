import { makeStyles } from "@material-ui/core/styles";
import yellow from "@material-ui/core/colors/yellow";

export const arrayStyles = makeStyles((theme) => ({
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
    }
  }));