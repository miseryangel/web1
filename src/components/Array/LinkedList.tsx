import React,{ useState, useEffect } from 'react';
import { Grid, Typography, ButtonGroup, Box, FormControl, MenuItem, Select, Button, TextField } from '@material-ui/core';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import { useHistory } from 'react-router-dom';
import { arrayStyles } from '../Styles/arrayStyle';
import {
    linkedListReset,
    linkedListResize,
    linkedListAddFirst,
    linkedListAddLast,
    linkedListPollFirst,
    linkedListPollLast,
    linkedListSet,
    linkedListRemove,
    linkedListClear,
    linkedListSort,
    linkedListInsert
} from '../../slices/Array';
import {
  arrayTransform,
  queueTransform,
  stackTransform,
} from '../../slices/Array';
import {LList} from '../bits/LList';

function ConditionalLLRenderer(props:{arr:number[],active:number}){
  if (props.arr.length === 0){
    return <Typography variant="h6" color = "secondary">LinkedList is Empty!</Typography>
  }else{
    return <LList arr = {props.arr} active = {props.active}/>
  }
} 

function LinkedList(){
    const dispatch = useAppDispatch();
    const linkedList = useAppSelector(state => state.linkedList.arr);
    const llLen = useAppSelector(state => state.linkedList.len);
    const [val,setVal] = useState(0);
    const [len,setLen] = useState(llLen);
    const [msg,setMsg] = useState<String>("");
    const [visible,setVisible] = useState(false);
    const [index,setIndex] = useState(0);
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
    },[visible,on,active,llLen])

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
      setLen(llLen);
      order === 0?setActive(0):setActive(llLen-1);
    }

    const transHandler = (e:React.ChangeEvent<{value:unknown}>) =>{
      const choice = e.target.value as string;
      setTrans(choice);
    }

    const maximize = () =>{
      switch(trans){
        case "Array":
          dispatch(arrayTransform(linkedList));
          break;
        case "Queue":
          dispatch(queueTransform(linkedList));
          break;
        case "Stack":
          dispatch(stackTransform(linkedList));
          break;
      }
      history.push(`/${trans}`);
    }
    
    return (
      <Grid  container spacing={3} justify="center">
        <Grid item xs = {10}>
          <Typography variant="h4">LinkedList</Typography>
          <ConditionalLLRenderer arr = {linkedList} active = {active} />
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
              <MenuItem value={"Queue"}>queue</MenuItem>
              <MenuItem value={"Stack"}>stack</MenuItem>
            </Select>
        </Grid>

        <Grid item xs = {10} >

          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
            color="primary"
          >
            <Button variant = "contained" onClick= {() => dispatch(linkedListReset())}>Refresh</Button>
            <Button onClick= {() => msgHandler(`The length of linkedList is ${llLen}`)}>GetSize</Button>
            <Button onClick= {() => llLen === 0?msgHandler("LinkedList is Empty !"):msgHandler("LinkedList is not empty!")}>IsEmpty</Button>
            <Button onClick= {() => {
              dispatch(linkedListClear());
            }}>Clear</Button>
          </ButtonGroup>

          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
            color="primary"
          >
            <Button onClick= {() => {
              if (linkedList.length === 0){
                msgHandler("LinkedList is Empty !");
              }else{
                msgHandler(`The first element is ${linkedList[0]}`);
              }
            }}>PeekFirst</Button>
            <Button onClick= {() => {
              if (linkedList.length === 0){
                msgHandler("LinkedList is Empty !");
              }else{
                msgHandler(`The last element is ${linkedList[linkedList.length-1]}`);
              }
            }}>PeekLast</Button>
            <Button onClick= {() => {
              if (linkedList.length === 0){
                msgHandler("LinkedList is Empty !");
              }else{
                msgHandler(`The fetched element is ${linkedList[0]}`);
                dispatch(linkedListPollFirst());
              }
            }}>PollFirst</Button>
            <Button onClick= {() => {
              if (linkedList.length === 0){
                msgHandler("LinkedList is Empty !");
              }else{
                msgHandler(`The fetched element is ${linkedList[linkedList.length-1]}`);
                dispatch(linkedListPollLast());
              }
            }}>PollLast</Button>
          </ButtonGroup>

          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
            color="secondary"
          >
            <Button onClick= {() => {
                if (linkedList.length >= 20){
                  msgHandler("The length of LinkedList has reached uplimit !")
                }else{
                  dispatch(linkedListAddFirst(val));
                }
            }}>
              AddFirst
            </Button>
            <Button onClick= {() => {
                if (linkedList.length >= 20){
                  msgHandler("The length of LinkedList has reached uplimit !")
                }else{
                  dispatch(linkedListAddLast(val));
                }
            }}>
              AddLast
            </Button>
            <Button onClick= {() => {
              linkedList.includes(val)?msgHandler("Element is in the linkedList !"):msgHandler("Element is not in the linkedList !");
            }}>
              Contains
            </Button>
            <Button onClick= {() => {
              console.log("val is",val);
              const firstIndex = linkedList.indexOf(val);
              if (firstIndex === -1){
                msgHandler("Element is in not linkedList !");
              }else{
                dispatch(linkedListRemove(firstIndex));
              }
            }}>Remove</Button>
            
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
                defaultValue = {llLen}
                variant="outlined"
                size="small"
                onChange = {(e) => setVal(+e.target.value)}
                style={{marginBottom:"10px"}}
              />
            </div>
            
            <div className = "label-container">
              <TextField
                className="outlined-number"
                label="Index"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: { 
                      max: len, min: 0 
                  }
                }}
                defaultValue = {val}
                variant="outlined"
                size="small"
                onChange = {(e) => setIndex(+e.target.value)}
              />
            </div>
            <Box pt={1}>
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
                    dispatch(linkedListResize(newLen));
                    dispatch(linkedListReset());
                  }else if (newLen < 0){
                    msgHandler("invalid length !");
                  }else{
                    msgHandler("value out of range !");
                  }
                }}
              />
            </Box>
          </ButtonGroup>

          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
            color="primary"
          >
            <Button onClick= {() => {
              const firstIndex = linkedList.indexOf(val);
              firstIndex === -1?msgHandler("Element is in not linkedlist !"):msgHandler(`The last index of element is ${firstIndex} !`);
            }}>
              IndexOf
            </Button>
            <Button onClick= {() =>{
                if (linkedList.length >= 20){
                  msgHandler("The length of linkedlist has reached the uplimit !");
                }else{
                  dispatch(linkedListInsert({index:index,element:val}));
                }
              }}>
              Insert
            </Button>
            <Button onClick= {() => {
              if (index < 0 || index >= len){
                msgHandler("Element is in not linkedList !");
              }else{
                msgHandler(`The fetched element is ${linkedList[index]}`);
              }
            }}>Get</Button>
            
            <Button onClick= {() => {
              if (index < 0 || index >= len){
                msgHandler("Element is in not linkedList !");
              }else if (val < 0 || val >= 100){
                msgHandler("value out of range !");
              }else{
                dispatch(linkedListSet({index:index,element:val}));
              }
              }}>set</Button>
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
            <Button onClick= {() => dispatch(linkedListSort(order))}>Sort</Button>
          </ButtonGroup>
          {visible && <Typography color="secondary" variant="h6">{msg}</Typography>}
        </Grid>
    </Grid>
    );
}

export default LinkedList;