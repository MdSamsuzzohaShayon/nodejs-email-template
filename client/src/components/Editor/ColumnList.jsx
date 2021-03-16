import React, { Component } from 'react';
import Column from './Column'




class ColumnList extends Component {
    constructor(props) {
        super(props);
    }
    render() {


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
                    // this.props.columnBlock.map(col => {
                    //     return connectDragSource(
                    //         <div key={col.id} className={col.cls}>{loopContent(col.contentHolder)}</div>
                    //     );
                    // }
                    // )
                    this.props.columnBlock.map(col => (
                        <Column key={col.id} cls={col.cls} contentHolder={col.contentHolder} />
                    )
                    )
                }

            </div>
        )
    }
}

export default ColumnList;






