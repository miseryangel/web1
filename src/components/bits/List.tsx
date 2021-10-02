import React from 'react';
import { Paper, Box } from '@material-ui/core';
import { arrayStyles } from '../Styles/arrayStyle';
import { linkedListStyles } from '../Styles/linkedListStyle';
import Zoom from "@material-ui/core/Zoom/Zoom";

export const List = (props:{arr:number[],active:number}) =>{
    const classes = arrayStyles();
    console.log(props.active);
    const arr = props.arr.map((val,index)=>{
        if (index === props.active){
            return (
            <Zoom>
                <Paper color="#ff6600" variant="outlined" square elevation={24}>{val}</Paper>
            </Zoom>
            );
        }
      return (<Paper variant="outlined" square elevation={3}>{val}</Paper>);
    });
    return (
        <Box p = {10} pt ={5} width = "94.6%" >
            <div className={classes.root}>
                {arr}
            </div>
        </Box>
      
    );
}