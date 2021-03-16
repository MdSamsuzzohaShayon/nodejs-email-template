import React from 'react';

function Content(props) {
    return (
        <div className="rb-content">
            {/* <div className="col img-holder">
            <img src="./icon/picture.png" alt="" />
            <p>Image</p>
        </div>
        <div className="col txt-holder">
            <img src="./icon/text.png" alt="" />
            <p>Text</p>
        </div>
        <div className="col btn-holder">
            <img src="./icon/button.png" alt="" />
            <p>Button</p>
        </div>
        <div className="col social-holder">
            <img src="./icon/social.png" alt="" />
            <p>Social</p>
        </div>
        <div className="col spx-holder">
            <img src="./icon/spacing.png" alt="" />
            <p>Spacing</p>
        </div> */}
            {
                props.contentBlock.map((content, index) => (
                    <div key={content.id} className={"col " + content.cls}>
                        <img src={content.img} alt="" />
                        <p>{content.text}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Content;





