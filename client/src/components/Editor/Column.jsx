import React, { Component } from 'react';
import { DragSource } from 'react-dnd'
import { BLOCK_TYPE } from "./Types";












/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const cardSource = {
    beginDrag(props) {
        console.log("Drag begin");
        // Return the data describing the dragged item
        const item = { id: props.id }
        return item
    },

    endDrag(props, monitor, component) {
        console.log("drag end");
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
        function loopContent(headerContent) {
            let elements = [];
            // console.log("elements: ", elements);
            for (let i = 0; i < headerContent; i++) {
                elements.push(<div key={i} className="content-holder"></div>);
            }
            return elements;
        }
        const { connectDragSource, connectDropTarget } = this.props
        return (
            <div className="rb-column">
                {/* <div className="col col-1-grid">
                            <div className="content-holder"></div>
                        </div>
                        <div className="col col-2-grid">
                            <div className="content-holder"></div>
                            <div className="content-holder"></div>
                        </div>
                        <div className="col col-3-grid">
                            <div className="content-holder"></div>
                            <div className="content-holder"></div>
                            <div className="content-holder"></div>
                        </div> */}
                {
                    this.props.columnBlock.map(col => {
                        return connectDragSource(
                            <div key={col.id} className={col.cls}>column</div>
                        );
                    }
                    )
                }

            </div>
        )
    }
}

export default DragSource(BLOCK_TYPE, cardSource, collect)(Column)






