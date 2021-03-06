import React from 'react';
import { Paper, Box } from '@material-ui/core';
import { arrayStyles } from '../Styles/arrayStyle';

export const List = (props:{arr:number[],active:number}) =>{
    const classes = arrayStyles();
    console.log(props.active);
    const arr = props.arr.map((val,index)=>{
        if (index === props.active){
            return (
                <Paper color="#ff6600" variant="outlined" className = {classes.active} elevation={24}>{val}</Paper>
            );
        }
      return (<Paper variant="outlined" square elevation={3}>{val}</Paper>);
    });
    return (
        <Box pt = {5} pb={2} width = "94.6%" >
            <div className={classes.root}>
                {arr}
            </div>
        </Box>
    );
}