import React, { Component } from 'react';
import { DragSource } from 'react-dnd'
import { BLOCK_TYPE } from "./Types";
import Column from './Column';
import Content from './Content';
import "./css/Rightbar.css";








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
    console.log("This is from collect");
    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDragSource: connect.dragSource(),
        // You can ask the monitor about the current drag state:
        isDragging: monitor.isDragging()
    }
}





export class RightBar extends Component {
    constructor(props) {
        super(props);
        console.log(props.columnBlock);
    }





    render() {

        // console.log(loopContent(20));

        const { connectDragSource, connectDropTarget } = this.props
        return connectDragSource(
            <div className="rb-wrapper">
                <div className="rb-header">
                    <h2>Template Creator</h2>
                    <h4>Drag & Drop to Get Started</h4>
                </div>
                {/* BLOCK START  */}
                <div className="rb-block">
                    {/* COLUMNS START  */}
                    <h3 className="content-header">Add Column</h3>
                    <Column columnBlock={this.props.columnBlock} />
                    {/* COLUMNS ENDS  */}

                    {/* CONTENT START  */}
                    <h3 className="content-header">Add Content</h3>
                    <Content contentBlock={this.props.contentBlock} />
                    {/* CONTENT ENDS  */}
                </div>
                {/* BLOCK ENDS  */}
                <div className="elements">
                    <h3 className="content-header">Add Element</h3>
                    <form >
                        <div className="row">
                            <label htmlFor="favcolor">Background color</label>
                            <input type="color" id="favcolor" name="favcolor" />
                        </div>
                        <div className="row">
                            <label htmlFor="favcolor">Text Link Color</label>
                            <input type="color" id="favcolor" name="favcolor" />
                        </div>
                    </form>
                    <div className="elements-header">
                        <header style={{ background: this.props.headerImg }} className="header-image">
                        </header>
                    </div>
                </div>

            </div>
        )

    }
}



export default DragSource(BLOCK_TYPE, cardSource, collect)(RightBar)
