import React from 'react';



function loopContent(headerContent) {
    let elements = [];
    console.log("elements: ", elements);
    for (let i = 0; i < headerContent; i++) {
        elements.push(<div key={i} className="content-holder"></div>);
    }
    return elements;
}

function Column(props) {
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
                props.columnBlock.map(col => (
                    <div key={col.id} className={col.cls}>{loopContent(col.contentHolder)}</div>
                )
                )
            }

        </div>
    )
}

export default Column;
