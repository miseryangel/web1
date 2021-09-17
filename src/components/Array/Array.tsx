import React,{ useState } from 'react';
import {Button, TextField } from '@material-ui/core';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
    arrayReset,
    arrayResize,
    arraySize,
    arrayIsEmpty,
    arrayAdd,
    arrayContains,
    arrayIndexOf,
    arrayLastIndexOf,
    arrayGet,
    arraySet,
    arrayRemove,
    arrayClear,
    arraySubList,
    arrayIterator,
    arraySort,
    arrayFill
} from '../../slices/Array';
import {List} from '../bits/List';

function Array(){
    const dispatch = useAppDispatch();
    const array = useAppSelector(state => state.array.arr);
    const [val,setVal] = useState(0);
    
    return (
    <React.Fragment>
        <List arr = {array}/>
        <Button variant = "contained" onClick= {() => dispatch(arrayReset())}>Reset</Button>
        <Button onClick= {() => dispatch(arraySize())}>Size</Button>
        <Button onClick= {() => dispatch(arrayResize(1))}>Increase</Button>
        <Button onClick= {() => dispatch(arrayResize(0))}>Decrease</Button>
        <Button onClick= {() => dispatch(arrayIsEmpty())}>IsEmpty</Button>
        <Button onClick= {() => dispatch(arrayContains(5))}>Contains</Button>
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
        <Button onClick= {() => dispatch(arrayAdd(val))}>Add</Button>
        <Button onClick= {() => dispatch(arrayIndexOf(0))}>IndexOf</Button>
        <Button onClick= {() => dispatch(arrayLastIndexOf(0))}>LastIndexOf</Button>
        <Button onClick= {() => dispatch(arrayGet(0))}>Get</Button>
        <Button onClick= {() => dispatch(arraySet({index:0,element:0}))}>Set</Button>
        <Button onClick= {() => dispatch(arrayRemove(5))}>Remove</Button>
        <Button onClick= {() => dispatch(arrayClear())}>Clear</Button>
        <Button onClick= {() => dispatch(arraySubList({from:0,to:0}))}>Sublist</Button>
        <Button onClick= {() => dispatch(arrayIterator(0))}>Iterator</Button>
        <Button onClick= {() => dispatch(arraySort(0))}>Sort</Button>
        <Button onClick= {() => dispatch(arrayFill(0))}>Fill</Button>
    </React.Fragment>
    );
}

export default Array;