import React,{ useState } from 'react';
import {Button, TextField } from '@material-ui/core';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
    queueReset,
    queueResize,
    queueAdd,
    queuePoll,
    queuePeek,
    queueContains,
    queueIterator,
} from '../../slices/Array';
import {List} from '../bits/List';

function Queue(){
    const dispatch = useAppDispatch();
    const queue = useAppSelector(state => state.queue.arr);
    const [val,setVal] = useState(0);
    
    return (
    <React.Fragment>
        <List arr = {queue} active = {-1}/>
        <Button variant = "contained" onClick= {() => dispatch(queueReset())}>Reset</Button>
        <Button onClick= {() => dispatch(queueReset())}>reset</Button>
        <Button onClick= {() => dispatch(queueResize(1))}>Resize</Button>
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
        <Button onClick= {() => dispatch(queueAdd(val))}>Add</Button>
        <Button onClick= {() => dispatch(queuePoll())}>Poll</Button>
        <Button onClick= {() => dispatch(queuePeek())}>Peek</Button>
        <Button onClick= {() => dispatch(queueContains(val))}>Peek</Button>
        <Button onClick= {() => dispatch(queueIterator(val))}>Peek</Button>
    </React.Fragment>
    );
}

export default Queue;