import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Button, TextField, ButtonGroup, FormControl, Select, MenuItem } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    bubbleReset,
    bubbleResize,
    bubbleForward 
} from '../../slices/Sorting';

function Tiles(props:{arr:number[]}){
    let array = [];
    for (let i = 0; i < props.arr.length; i++){
      array.push(<div className= "array-bar" style={{height:`${props.arr[i]*400/props.arr.length}px`}}> </div>);
    }
    return <div className ="array-container">
              {array}
            </div>
  }


function BubbleSort() {
    const [on,setOn] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const isOver = useAppSelector(state => state.bubbleSort.isOver);
    const array = useAppSelector(state => state.bubbleSort.arr);
    const [msg,setMsg] = useState<String>("");
    const [visible,setVisible] = useState(false);

    useEffect(()=>{
        let interval:ReturnType<typeof setInterval>|null = null;
        if (on && !isOver){
        interval = setInterval(()=>{
            dispatch(bubbleForward())
        },10);
        }else{
        clearInterval(interval!);
        }
        return () =>clearInterval(interval!);
    },[on,isOver]);

    const msgHandler = (message:String) =>{
        setVisible(true);
        setMsg(message);
        setInterval(() => setVisible(false),2000);
      }

    return (
        <Grid container spacing = {3} justify="center">
            <Grid item xs = {10}>
                <Typography variant="h4">BubbleSort</Typography>
                <Tiles arr = {array}/>
            </Grid>
            <Grid item xs = {10}>
                <Button onClick = {() => setOn(!on)}>{on?`pause`:`start`}</Button>
                <TextField
                className="outlined-number"
                label="Length"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: { 
                      max: 200, min: 50 
                  }
                }}
                defaultValue = {100}
                variant="outlined"
                size="small"
                onChange={(e)=>{
                  const newLen = +e.target.value;
                  if (newLen >= 50  && newLen <= 200){
                    dispatch(bubbleResize(newLen));
                    dispatch(bubbleReset());
                  }else if (newLen < 0){
                    msgHandler("invalid length !");
                  }else{
                    msgHandler("value out of range !");
                  }
                }}
              />
            </Grid>
            {visible && <Typography color="secondary" variant="h6">{msg}</Typography>}
        </Grid>
    );
}
  
export default BubbleSort;
