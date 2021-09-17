import React from 'react';
import { Paper, Box } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import yellow from "@material-ui/core/colors/yellow";

const useStyles = makeStyles((theme) => ({
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
      }
    }
  }));

export const List = (props:{arr:number[]}) =>{
    const classes = useStyles();
    const arr = props.arr.map((val)=>{
      return (<Paper variant="outlined" square elevation={3}>{val}</Paper>)
    });
    return (
        <Box p = {10} pt ={20} width = "80%" >
            <div className={classes.root}>
                {arr}
            </div>
        </Box>
      
    );
}