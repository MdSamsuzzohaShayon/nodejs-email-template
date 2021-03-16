import React, { Component } from 'react';
import Body from './Body';
import './css/Template.css';

export class Template extends Component {
    constructor(props) {
        super(props);
    }







    render() {
        return (
            <div className="temp-container">
                <header className="header">
                    <form className="h-form">
                        <input type="text" id="header" onChange={this.props.titleChangeHandler} placeholder="Newslatter title" />
                    </form>
                    <div className="h-btn">
                        <button className="btn cancel">Cancel</button>
                        <button className="btn save">Save</button>
                    </div>
                </header>
                {/* TEMPLATE BODY START  */}
                <Body />
                {/* TEMPLATE BODY ENDS  */}
            </div>
        )
    }
}

export default Template;
