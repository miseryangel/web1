import React from 'react';
import { Paper, Box } from '@material-ui/core';
import { linkedListStyles } from '../Styles/linkedListStyle';

export const LList = (props:{arr:number[],active:number}) =>{
    const classes = linkedListStyles();
    const arr = props.arr.map((val,index)=>{
        if (index === props.active){
            return (
                <Paper color="#ff6600" variant="outlined" className = {classes.active} elevation={24}>{val}</Paper>
            );
        }
      return (
        <Paper variant="outlined" className = {classes.customBorderRadius} elevation={3}>{val}</Paper>
      );
    });
    return (
        <Box p = {10} pt ={5} width = "94.6%" >
            <div className={classes.root}>
                {arr}
            </div>
        </Box>
    );
}