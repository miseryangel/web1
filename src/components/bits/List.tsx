import React from 'react';
import { Paper, Box } from '@material-ui/core';
import { useStyles } from '../Styles/arrayStyle';

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