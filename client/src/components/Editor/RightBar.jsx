import React, { Component } from 'react';
import "./css/Rightbar.css";

export class RightBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="rb-wrapper">
                <div className="rb-header">
                    <h2>Template Creator</h2>
                    <h4>Drag & Drop to Get Started</h4>
                </div>
                <div className="rb-block">
                    <h3>Add Column</h3>
                    <div className="rb-column block">
                        <div className="col col-1-grid">
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
                        </div>
                    </div>
                    <div className="rb-content-block">
                        content
                    </div>
                </div>
            </div>
        )
    }
}

export default RightBar;
