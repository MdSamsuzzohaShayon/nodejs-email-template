import React, { Component } from 'react';
import { DragSource } from 'react-dnd'
import { COLUMN_BLOCK } from "./Types";


// console.log("Block type", BLOCK_TYPE);



/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const cardSource = {
    beginDrag(props) {
        // console.log("Drag begin, props: ", props);
        // Return the data describing the dragged item
        const item = { id: props.id }
        return item
    },

    endDrag(props, monitor, component) {
        // console.log("drag end, props: ", props);
        // console.log("drag end, monitor: ", monitor);
        // console.log("drag end, component: ", component);
        if (!monitor.didDrop()) {
            return
        }

        // When dropped on a compatible target, do something
        const item = monitor.getItem()
        const dropResult = monitor.getDropResult()
        // CardActions.moveCardToList(item.id, dropResult.listId)
    }
}

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
    // console.log("This is from collect");
    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDragSource: connect.dragSource(),
        // You can ask the monitor about the current drag state:
        isDragging: monitor.isDragging()

    }
}





class Column extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        // console.log("Props from column: ", this.props);
        function loopContent(headerContent) {
            let elements = [];
            // console.log("elements: ", elements);
            for (let i = 0; i < headerContent; i++) {
                elements.push(<div key={i} className="content-holder"></div>);
            }
            return elements;
        }
        const { connectDragSource, connectDropTarget } = this.props
        return connectDragSource(
            <div className={this.props.cls}>{loopContent(this.props.contentHolder)}</div>
        )
    }
}


export default DragSource(COLUMN_BLOCK, cardSource, collect)(Column);
