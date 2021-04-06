import React, { Component } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import RightBar from '../../components/Editor/RightBar';
import Template from '../../components/Editor/Template';
import "./Editor.css";

export class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Default Title",
            headerImgURL: "url(./img/header.jpg)",
            // DRAGABLE COLUMN CONTENT BLOCK START
            columnBlock: [
                {
                    id: 1,
                    cls: "col col-1-grid",
                    contentHolder: 1
                },
                {
                    id: 2,
                    cls: "col col-2-grid",
                    contentHolder: 2
                },
                {
                    id: 3,
                    cls: "col col-3-grid",
                    contentHolder: 3
                },
            ],
            contentBlock: [
                {
                    id: 1,
                    img: "./icon/picture.png",
                    cls: "img-holder",
                    text: "Image"
                },
                {
                    id: 2,
                    img: "./icon/text.png",
                    cls: "txt-holder",
                    text: "Text"
                },
                {
                    id: 3,
                    img: "./icon/button.png",
                    cls: "btn-holder",
                    text: "Button"
                },
                {
                    id: 4,
                    img: "./icon/social.png",
                    cls: "social-holder",
                    text: "Social"
                },
                {
                    id: 5,
                    img: "./icon/spacing.png",
                    cls: "txt-holder",
                    text: "Spacing"
                },
            ]
            // DRAGABLE COLUMN CONTENT BLOCK ENDS


        }
    }

    titleChangeHandler = (e) => {
        e.preventDefault();
        console.log("this is title change ahndler");
        console.log("Value of title input: ", e.target.value);
    }
    render() {
        return (
            <DndProvider backend={HTML5Backend}>
                <div className="Editor">
                    <div className="column template">
                        <Template
                            titleChangeHandler={this.titleChangeHandler}
                            headerImg={this.state.headerImgURL}
                        />
                    </div>
                    <div className="column right-bar">
                        <RightBar
                            headerImg={this.state.headerImgURL}
                            columnBlock={this.state.columnBlock}
                            contentBlock={this.state.contentBlock}
                        />
                    </div>
                </div>
            </DndProvider>
        )
    }
}

export default Editor;
