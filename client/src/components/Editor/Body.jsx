import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';
import { COLUMN_BLOCK } from "./Types";

























const bodyTarget = {
    canDrop(props, monitor) {
        // console.log("Props: " + props, "Monitor: ", monitor);
        // You can disallow drop based on props or item
        console.log("You can disallow drop based on props or item");
        const item = monitor.getItem();
        console.log("canDrop - Item: ", item);
        // return canMakeChessMove(item.fromPosition, props.position)
    },

    hover(props, monitor, component) {
        // This is fired very often and lets you perform side effects
        // in response to the hover. You can't handle enter and leave
        // here—if you need them, put monitor.isOver() into collect() so you
        // can use componentDidUpdate() to handle enter/leave.

        console.log("Hover");

        // You can access the coordinates if you need them
        const clientOffset = monitor.getClientOffset();
        console.log("hover - Client offset: ", clientOffset);
        const componentRect = findDOMNode(component).getBoundingClientRect()
        console.log("hover - componentRect: ", componentRect);

        // You can check whether we're over a nested drop target
        const isOnlyThisOne = monitor.isOver({ shallow: true });
        console.log("hover - isOnlyThisOne: ", isOnlyThisOne);

        // You will receive hover() even for items for which canDrop() is false
        const canDrop = monitor.canDrop()
        console.log("hover - canDrop: ", canDrop);

    },

    drop(props, monitor, component) {
        console.log("Drop");
        if (monitor.didDrop()) {
            // If you want, you can check whether some nested
            // target already handled drop
            console.log("Drop - didDrop: ", monitor.didDrop());
            return
        }

        // Obtain the dragged item
        const item = monitor.getItem();
        console.log("Drop - Item: ", item);

        // You can do something with it
        // ChessActions.movePiece(item.fromPosition, props.position)

        // You can also do nothing and return a drop result,
        // which will be available as monitor.getDropResult()
        // in the drag source's endDrag() method
        // return { moved: true }
    }
}

























/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDropTarget: connect.dropTarget(),
        // You can ask the monitor about the current drag state:
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType()
    }
}


// console.log("Body - Collect: ", collect);





























class Body extends Component {
    constructor(props) {
        super(props);
    }





    componentDidUpdate(prevProps) {
        if (!prevProps.isOver && this.props.isOver) {
            // You can use this as enter handler
            console.log("!prevProps.isOver && this.props.isOver  -  You can use this as enter handler");
        }

        if (prevProps.isOver && !this.props.isOver) {
            // You can use this as leave handler
            console.log("prevProps.isOver && !this.props.isOver - You can use this as leave handler");
        }

        if (prevProps.isOverCurrent && !this.props.isOverCurrent) {
            // You can be more specific and track enter/leave
            // shallowly, not including nested targets
            console.log("prevProps.isOverCurrent && !this.props.isOverCurrent - You can be more specific and track enter/leave");
        }
    }









    render() {

        // Your component receives its own props as usual
        const { position } = this.props

        // These props are injected by React DnD,
        // as defined by your `collect` function above:
        const { isOver, canDrop, connectDropTarget } = this.props



        return connectDropTarget(

            <div className="template-body">
                {/* THERE WILL BE OUR DROPABLE COLUMN OR CONTENT */}
                <div className="Cell">
                    {isOver && canDrop && <div className="green" />}
                    {!isOver && canDrop && <div className="yellow" />}
                    {isOver && !canDrop && <div className="red" />}
                </div>
            </div>
        )
    }
}

export default DropTarget(COLUMN_BLOCK, bodyTarget, collect)(Body)
