import React, { Component } from 'react';
import RightBar from '../../components/Editor/RightBar';
import Template from '../../components/Editor/Template';
import "./Editor.css";

export class Editor extends Component {
    render() {
        return (
            <div className="Editor">
                <div className="column template">
                    <Template />
                </div>
                <div className="column right-bar">
                    <RightBar />
                </div>
            </div>
        )
    }
}

export default Editor;
