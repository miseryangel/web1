import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Button, TextField, ButtonGroup, FormControl, Select, MenuItem } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useHistory } from 'react-router-dom';
import {
  arrayReset,
  arrayResize,
  arrayAdd,
  arraySet,
  arrayRemove,
  arrayClear,
  arraySubList,
  arraySort,
  arrayFill
} from '../../slices/Array';
import {
  linkedListTransform,
  queueTransform,
  stackTransform,
} from '../../slices/Array';
import { List } from '../bits/List';
import { arrayStyles } from '../Styles/arrayStyle';

function ConditionalArrayRenderer(props:{arr:number[],active:number}){
  if (props.arr.length === 0){
    return (
      <Box pt = {5} pb={2} >
      <Typography variant="h6" color = "secondary">Array is Empty!</Typography>
      </Box>
      )
  }else{
    return <List arr = {props.arr} active = {props.active}/>
  }
}  


function Array(){
    const dispatch = useAppDispatch();
    const array = useAppSelector(state => state.array.arr);
    const arrLen = useAppSelector(state => state.array.len);
    const value = useAppSelector(state => state.array.val);
    const [val,setVal] = useState(0);
    const [msg,setMsg] = useState<String>("");
    const [index,setIndex] = useState(0);
    const [order,setOrder] = useState(0);
    const [len,setLen] = useState(array.length);
    const [visible,setVisible] = useState(false);
    const [start,setStart] = useState(0);
    const [end,setEnd] = useState(len);
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
    },[visible,value,on,active,array,arrLen])

    const msgHandler = (message:String) =>{
      setVisible(true);
      setMsg(message);
      setInterval(() => setVisible(false),2000);
    }

    const orderHandler = (e:React.ChangeEvent<{value:unknown}>) =>{
      e.target.value === 1? setOrder(1):setOrder(0);
    }

    const iteratorHandler = () =>{
      setOn(true);
      setLen(array.length);
      order === 0?setActive(0):setActive(arrLen-1);
    }

    const transHandler = (e:React.ChangeEvent<{value:unknown}>) =>{
      const choice = e.target.value as string;
      setTrans(choice);
    }

    const maximize = () =>{
      console.log(trans);
      switch(trans){
        case "LinkedList":
          dispatch(linkedListTransform(array));
          break;
        case "Queue":
          dispatch(queueTransform(array));
          break;
        case "Stack":
          dispatch(stackTransform(array));
          break;
      }
      history.push(`/${trans}`);
    }

    return (
      <Grid container spacing = {3} justify="center">
        <Grid item xs = {10}>
          <Typography variant="h4">Array</Typography>
          <ConditionalArrayRenderer arr = {array} active = {active} />
          
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
              <MenuItem value={"LinkedList"}>linkedList</MenuItem>
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
            <Button variant = "contained" onClick= {() => dispatch(arrayReset())}>Refresh</Button>
            <Button onClick= {() => msgHandler(`The length of array is ${arrLen}`)}>GetSize</Button>
            <Button onClick= {() => arrLen === 0?msgHandler("Array is Empty !"):msgHandler("Array is not empty!")}>IsEmpty</Button>
            <Button onClick= {() => dispatch(arrayClear())}>Clear</Button>
          </ButtonGroup>
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
            color="secondary"
          >
            <Button onClick= {() => {
                if (arrLen >= 20){
                  msgHandler("Array length has reached uplimit !")
                }else{
                  dispatch(arrayAdd(val));
                }
            }}>
              Add
            </Button>
            <Button onClick= {() => {
              array.includes(val)?msgHandler("Element is in the array !"):msgHandler("Element is not in the array !");
            }}>
              Contains
            </Button>
            <Button onClick= {() => {
              const firstIndex = array.indexOf(val);
              firstIndex === -1?msgHandler("Element is not in the array !"):msgHandler(`The last index of element is ${firstIndex} !`);
            }}>
              IndexOf
            </Button>
            <Button onClick= {() =>{
                const lastIndex = array.lastIndexOf(val);
                lastIndex === -1?msgHandler("Element is in not array !"):msgHandler(`the first index of element is ${lastIndex} !`);
              }}>
              LastIndexOf
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
                defaultValue = {val}
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
                defaultValue = {len}
                variant="outlined"
                size="small"
                onChange={(e)=>{
                  const newLen = +e.target.value;
                  if (newLen >= 0  && newLen <= 20){
                    setLen(newLen);
                    dispatch(arrayResize(newLen));
                    dispatch(arrayReset());
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
              if (index < 0 || index >= len){
                msgHandler("Element is in not array !");
              }else{
                msgHandler(`The fetched element is ${array[index]}`);
              }
            }}>Get</Button>
            <Button onClick= {() => {
              const firstIndex = array.indexOf(val);
              if (firstIndex === -1){
                msgHandler("Element is in not array !");
              }else{
                dispatch(arrayRemove(firstIndex));
              }
            }}>Remove</Button>
            <Button onClick= {() => dispatch(arrayFill(val))}>Fill</Button>
            <Button onClick= {() => {
              if (index < 0 || index >= len){
                msgHandler("Element is in not array !");
              }else if (val < 0 || val >= 100){
                msgHandler("value out of range !");
              }else{
                dispatch(arraySet({index:index,element:val}));
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
            <Button onClick= {() => dispatch(arraySort(order))}>Sort</Button>
          </ButtonGroup>
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
            color="primary"
          >
          </ButtonGroup>

          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
            color="primary"
          >
            <div className = "label-container">
              <TextField
                label="startIndex"
                className="outlined-number"
                type="number"
                value={start}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                size="small"
                onChange={(e) => setStart(+e.target.value)}
              />
            </div>
            <Button onClick= {() => {
                console.log(len);
                if (start < 0 || start > end || end > len){
                  msgHandler("Invalid indices!");
                }else{
                  dispatch(arraySubList({from:start,to:end}));
                }
              }}>
              Sublist
            </Button>
            <Box pt={1}>
              <TextField
                label="endIndex"
                className="outlined-number"
                type="number"
                value={end}
                size="small"
                onChange={(e) => setEnd(+e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Box>
          </ButtonGroup>
          {visible && <Typography color="secondary" variant="h6">{msg}</Typography>}
        </Grid>
        
    </Grid>
    );
}

export default Array;