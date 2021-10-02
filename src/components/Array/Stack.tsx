import React,{ useState } from 'react';
import {Button, TextField } from '@material-ui/core';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
    stackReset,
    stackResize,
    stackEmpty,
    stackPop,
    stackPeek,
    stackPush,
    stackContains,
} from '../../slices/Array';
import {List} from '../bits/List';

function Stack(){
    const dispatch = useAppDispatch();
    const stack = useAppSelector(state => state.stack.arr);
    const [val,setVal] = useState(0);
    
    return (
    <React.Fragment>
        <List arr = {stack} active ={-1}/>
        <Button variant = "contained" onClick= {() => dispatch(stackReset())}>Reset</Button>
        <Button onClick= {() => dispatch(stackResize(1))}>Resize</Button>
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputProps={{
            inputProps: { 
                max: 20, min: 10 
            }
          }}
          variant="outlined"
          onChange = {(e) => setVal(+e.target.value)}
        />
        <Button onClick= {() => dispatch(stackEmpty())}>IsEmpty</Button>
        <Button onClick= {() => dispatch(stackPop())}>Pop</Button>
        <Button onClick= {() => dispatch(stackPeek())}>Peek</Button>
        <Button onClick= {() => dispatch(stackPush(val))}>Push</Button>
        <Button onClick= {() => dispatch(stackContains(val))}>stackContains</Button>
    </React.Fragment>
    );
}

export default Stack;