import React, { Component } from 'react';
import ColumnList from './ColumnList';
import Content from './Content';
import "./css/Rightbar.css";













export class RightBar extends Component {
    constructor(props) {
        super(props);
        console.log(props.columnBlock);
    }








    render() {

        // console.log(loopContent(20));

        return (
            <div className="rb-wrapper">
                <div className="rb-header">
                    <h2>Template Creator</h2>
                    <h4>Drag & Drop to Get Started</h4>
                </div>
                {/* BLOCK START  */}
                <div className="rb-block">
                    {/* COLUMNS START  */}
                    <h3 className="content-header">Add Column</h3>
                    <ColumnList connectDrugSource={this.connectDrugSource} columnBlock={this.props.columnBlock} />
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



export default RightBar;
