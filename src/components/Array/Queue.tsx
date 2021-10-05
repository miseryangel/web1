import React,{ useState, useEffect } from 'react';
import {Button, Grid, ButtonGroup, TextField, Typography, FormControl, Select, MenuItem } from '@material-ui/core';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import { useHistory } from 'react-router-dom';
import { arrayStyles } from '../Styles/arrayStyle';
import {
    queueReset,
    queueResize,
    queueAdd,
    queuePoll,
} from '../../slices/Array';
import {
  arrayTransform,
  linkedListTransform,
  stackTransform,
} from '../../slices/Array';
import {List} from '../bits/List';

function ConditionalLLRenderer(props:{arr:number[],active:number}){
  if (props.arr.length === 0){
    return <Typography variant="h6" color = "secondary">Queue is Empty!</Typography>
  }else{
    return <List arr = {props.arr} active = {props.active}/>
  }
} 

function Queue(){
    const dispatch = useAppDispatch();
    const queue = useAppSelector(state => state.queue.arr);
    const qLen = useAppSelector(state => state.queue.len);
    const [val,setVal] = useState(0);
    const [len,setLen] = useState(qLen);
    const [msg,setMsg] = useState<String>("");
    const [visible,setVisible] = useState(false);
    const [order,setOrder] = useState(0);
    const [active,setActive] = useState(-1);
    const [on,setOn] = useState(false);
    const [trans,setTrans] = useState("");
    const history = useHistory();
    const classes = arrayStyles();

    useEffect(() =>{
      let interval:ReturnType<typeof setInterval>|null = null;
      if (on){
        interval = setInterval(()=>{
          order === 0?setActive(active+1):setActive(active-1);
          if (active >= len || active < 0){
            setOn(false);
          }
        },200);
      }else{
        clearInterval(interval!);
      }
      return () =>clearInterval(interval!);
    },[visible,on,active,qLen])

    const msgHandler = (message:String) =>{
      setVisible(true);
      setMsg(message);
      let interval = setInterval(() => setVisible(false),2000);
      return () =>clearInterval(interval);
    }

    const orderHandler = (e:React.ChangeEvent<{value:unknown}>) =>{
      e.target.value === 1? setOrder(1):setOrder(0);
    }

    const iteratorHandler = () =>{
      setOn(true);
      setLen(qLen);
      order === 0?setActive(0):setActive(qLen-1);
    }

    const transHandler = (e:React.ChangeEvent<{value:unknown}>) =>{
      const choice = e.target.value as string;
      setTrans(choice);
    }

    const maximize = () =>{
      switch(trans){
        case "LinkedList":
          dispatch(linkedListTransform(queue));
          break;
        case "Array":
          dispatch(arrayTransform(queue));
          break;
        case "Stack":
          dispatch(stackTransform(queue));
          break;
      }
      history.push(`/${trans}`);
    }
    
    return (
      <Grid  container spacing={3} justify="center">
        <Grid item xs = {10}>
          <Typography variant="h4">Queue</Typography>
          <ConditionalLLRenderer arr = {queue} active = {active} />
        </Grid>

        <Grid item xs = {10} >
          <Button variant = "contained" className={classes.transform} onClick= {maximize}>Transform</Button>
          <Select
              labelId="trans-label"
              className="trans-select"
              value={trans}
              label="Transformation"
              autoWidth 
              type="text"
              onChange = {transHandler}
            >
              <MenuItem value={"Array"}>array</MenuItem>
              <MenuItem value={"LinkedList"}>linkedList</MenuItem>
              <MenuItem value={"Stack"}>stack</MenuItem>
            </Select>
        </Grid>

        <Grid item xs = {10} >

          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
            color="primary"
          >
            <Button variant = "contained" onClick= {() => dispatch(queueReset())}>Refresh</Button>
            <Button onClick= {() => msgHandler(`The length of queue is ${qLen}`)}>GetSize</Button>
            <Button onClick= {() => qLen === 0?msgHandler("Queue is Empty !"):msgHandler("Queue is not empty!")}>IsEmpty</Button>
          </ButtonGroup>

          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
            color="primary"
          >
            <Button onClick= {() => {
              if (queue.length === 0){
                msgHandler("Queue is Empty !");
              }else{
                msgHandler(`The first element is ${queue[0]}`);
              }
            }}>Peek</Button>
            <Button onClick= {() => {
              if (queue.length === 0){
                msgHandler("Queue is Empty !");
              }else{
                msgHandler(`The fetched element is ${queue[0]}`);
                dispatch(queuePoll());
              }
            }}>Poll</Button>
          </ButtonGroup>

          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
            color="secondary"
          >
            <Button onClick= {() => {
                if (queue.length >= 20){
                  msgHandler("The length of queue has reached uplimit !")
                }else{
                  dispatch(queueAdd(val));
                }
            }}>
              Add
            </Button>
            <Button onClick= {() => {
              queue.includes(val)?msgHandler("Element is in the queue !"):msgHandler("Element is not in the queue !");
            }}>
              Contains
            </Button>
            
          </ButtonGroup>
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
            color="primary"
          >
            <div className = "label-container">
              <TextField
                className="outlined-number"
                label="Number"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: { 
                      max: 100, min: 0 
                  }
                }}
                defaultValue = {qLen}
                variant="outlined"
                size="small"
                onChange = {(e) => setVal(+e.target.value)}
                style={{marginBottom:"10px"}}
              />
            </div>
            
            <div>
              <TextField
                className="outlined-number"
                label="Length"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: { 
                      max: 20, min: 0 
                  }
                }}
                value = {len}
                variant="outlined"
                size="small"
                onChange={(e)=>{
                  const newLen = +e.target.value;
                  if (newLen >= 0  && newLen <= 20){
                    setLen(newLen);
                    dispatch(queueResize(newLen));
                    dispatch(queueReset());
                  }else if (newLen < 0){
                    msgHandler("invalid length !");
                  }else{
                    msgHandler("value out of range !");
                  }
                }}
              />
            </div>
          </ButtonGroup>

          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
            color="primary"
          >
            <Button onClick= {iteratorHandler}>Iterator</Button>
            <FormControl variant="outlined" size="small">
            <Select
              labelId="order-label"
              className="order-select"
              value={order}
              label="Order"
              autoWidth 
              type="number"
              onChange = {orderHandler}
            >
              <MenuItem value={0}>Ascending</MenuItem>
              <MenuItem value={1}>Descending</MenuItem>
            </Select>
            </FormControl>
          </ButtonGroup>
          {visible && <Typography color="secondary" variant="h6">{msg}</Typography>}
        </Grid>
    </Grid>
    );
}

export default Queue;