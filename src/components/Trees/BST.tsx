import { TreeNode } from "../../slices/bricks/node";
import { Tree } from "../../slices/bricks/tree";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import {
    reset,
    changeVal,
    delegate,
    addNode,
    deleteNode
} from '../../slices/Tree';
import { Input,Button } from "@material-ui/core";


const BST = () =>{
    const dispatch = useAppDispatch();
    const tree = useAppSelector(state => state.bst.tree);
    const val = useAppSelector(state => state.bst.val);
    useEffect(() =>{
        console.log(tree);
    },[])
    return (
        <div>
            <Input
                type = "number"
                defaultValue = {val}
                onChange = {(e) =>{+e.target.value > 0 && +e.target.value < 1000?dispatch(changeVal(+e.target.value)):dispatch(changeVal(val))}}
            />
            <Button onClick= {() =>dispatch(addNode())} >insert</Button>
        </div>
    )
}

export default BST;