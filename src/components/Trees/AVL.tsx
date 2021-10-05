import {  AVLNode } from "../../slices/bricks/node";
import { Input , Typography, Box, Grid, Button, TextField, ButtonGroup, FormControl, Select, MenuItem } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Tree } from '../bits/Tree';
import { useState, useEffect } from 'react';
import {
    avlAddNode,
    avlDeleteNode
} from '../../slices/Tree';

function ConditionalTreeRenderer(props:{root:AVLNode | null, active:number}){
    if (props.root === null){
      return (
        <Box pt = {5} pb={2} >
        <Typography variant="h6" color = "secondary">AVLTree is Empty!</Typography>
        </Box>
        )
    }else{
      return <Tree root = {props.root} active = {props.active}/>
    }
  }  


const AVL = () =>{
    const dispatch = useAppDispatch();
    const tree = useAppSelector(state => state.avl.tree);
    const root = tree.root;
    const visited = useAppSelector(state => state.avl.visited);
    const [val,setVal] = useState(-1);
    const [nodeVal,setNodeVal] = useState(-1);
    const [msg,setMsg] = useState<String>("");
    const [visible,setVisible] = useState(false);
    const [traverseChoice,setTraverse] = useState(1);
    useEffect(() =>{
        console.log(tree);
    },[visible])

    const msgHandler = (message:String) =>{
        setVisible(true);
        setMsg(message);
        let interval = setInterval(() => setVisible(false),2000);
        return () =>clearInterval(interval);
    }

    const inOrder = (node:AVLNode|null) =>{
        if (node === null) return;
        inOrder(node.left);
        let interval = setInterval(() => setVal(node.val),500);
        inOrder(node.right);
        return () =>clearInterval(interval);
    }

    const preOrder = (node:AVLNode|null) =>{
        if (node === null) return;
        let interval = setInterval(() => setVal(node.val),500);
        preOrder(node.left);
        preOrder(node.right);
        return () =>clearInterval(interval);
    }

    const postOrder = (node:AVLNode|null) =>{
        if (node === null) return;
        postOrder(node.left);
        postOrder(node.right);
        let interval = setInterval(() => setVal(node.val),500);
        return () =>clearInterval(interval);
    }

    const traverseHandler = () =>{
        switch(traverseChoice){
          case 1:
            inOrder(root);
            break;
          case 2:
            preOrder(root);
            break;
          case 3:
            postOrder(root);
            break;
        }
        setVal(-1);
    }
    const dfs = (node: AVLNode|null, value:number):number =>{
        if (node === null) return 0;
        if (value > node.val){
            return dfs(node.right,value);
        }
        return dfs(node.left,value);
    }

    return (
        <Box pt={5}>
            <Grid container spacing = {3} justify="center">
                <Grid item xs = {8} justify="center"> 
                    <ConditionalTreeRenderer root = {root} active = {val} />
                </Grid>
                <Grid item xs = {3}>
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical outlined button group"
                        color="primary"
                    >
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
                        <TextField
                            className="outlined-number"
                            label="Node"
                            type="number"
                            InputLabelProps={{
                            shrink: true,
                            }}
                            InputProps={{
                            inputProps: { 
                                max: 100, min: 0 
                            }
                            }}
                            defaultValue = {nodeVal}
                            variant="outlined"
                            size="small"
                            onChange = {(e) => setNodeVal(+e.target.value)}
                            style={{marginBottom:"10px"}}
                        />
                        <FormControl variant="outlined" size="small">
                            <Select
                            labelId="order-label"
                            className="order-select"
                            value={traverseChoice}
                            label="Order"
                            autoWidth 
                            type="number"
                            onChange = {(e) =>{
                              const op = e.target.value as number;
                              setTraverse(op);
                            }}
                            >
                            <MenuItem value={1}>inOrder</MenuItem>
                            <MenuItem value={2}>preOrder</MenuItem>
                            <MenuItem value={3}>postOrder</MenuItem>
                            </Select>
                        </FormControl>
                        
                    </ButtonGroup>
                    <ButtonGroup
                        orientation="vertical"
                        aria-label="vertical outlined button group"
                        color="primary"
                    >
                        <Button onClick= {() =>{
                            if (visited.has(val)){
                                msgHandler("AVLNode already exists!");
                            }else{
                                const depth = dfs(root,val);
                                if (depth > 5){
                                    msgHandler("Tree has reached the height limit !");
                                    return;
                                }
                                dispatch(avlAddNode(val));
                            }
                        }} >insert</Button>
                        <Button onClick= {() =>{
                            if (!visited.has(val)){
                                msgHandler("AVLNode doesn't exist!");
                            }else{
                                dispatch(avlDeleteNode(val));
                            }
                        }} >remove</Button>
                        <Button onClick= {traverseHandler} >traverse</Button>
                    </ButtonGroup>
                </Grid>
                {visible && <Typography color="secondary" variant="h6">{msg}</Typography>}
            </Grid>
        </Box>

    )
}

export default AVL;