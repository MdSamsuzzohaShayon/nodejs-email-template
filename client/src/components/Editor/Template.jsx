import React, { Component } from 'react';
import './Template.css';

export class Template extends Component {
    render() {
        return (
            <div className="temp-container">
                <header className="header">
                    <form className="h-form">
                        <input type="text" placeholder="Newslatter title" />
                    </form>
                    <div className="h-btn">
                        <button className="btn cancel">Cancel</button>
                        <button className="btn save">Save</button>
                    </div>
                </header>
                <div className="template-wrapper">
                    <header style={{ background: 'url(./img/sky-blue.jpg)' }} className="header-image">
                        This is header image
                    </header>
                    <div className="temp-body">
                        {/* THERE WILL BE OUR DROPABLE COLUMN OR CONTENT */}
                        <h2>Drop</h2>
                    </div>
                </div>
            </div>
        )
    }
}

export default Template;
