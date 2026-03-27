// dom-elements.js - DOM Element References

export class DOMElements {
    constructor() {
        this.templateBuilder = document.getElementById('template-builder');
        this.submitSpinner = document.getElementById('submit-spinner');
        this.inputTitle = document.getElementById('title');
        this.saveButton = document.getElementById('save-btn');
        this.cancelButton = document.getElementById('cancel-btn');
        this.headerImgInput = document.getElementById('header-img-input');
        this.headerImage = document.getElementById('header-img');
        this.headerImgPreview = document.getElementById('header-img-preview');
        this.templateWrapper = document.querySelector('.template-wrapper');
        this.templateBGColorInput = document.getElementById('t-bg-color');
        this.templateLinkColorInput = document.getElementById('t-link-color');
        this.dropColumnZone = document.getElementById('drop-zone');
        this.rightBar = document.querySelector('.right-bar');
        this.rightBarContent = document.getElementById('br-content');
        this.deleteHeaderImg = document.getElementById('delete-header-img');
        this.propertiesBar = document.getElementById('rb-props');
        this.blockElementBar = document.getElementById('rb-block');
        this.allProperties = document.querySelectorAll('.props');
    }

    getDraggableColumns() {
        return document.querySelectorAll('.block-col');
    }

    getContentBlocks() {
        return document.querySelectorAll('.content-block-col');
    }

    getRowProps() {
        return {
            rowProps: document.querySelector('.row-props'),
            moveUp: document.getElementById('row-move-up'),
            moveDown: document.getElementById('row-move-down'),
            delete: document.getElementById('row-delete')
        };
    }

    getTxtProps() {
        return {
            txtProps: document.querySelector('.txt-props'),
            alignBtns: document.querySelectorAll('.txt-align-btn'),
            fontFamily: document.getElementById('txt-font-family'),
            fontSize: document.getElementById('txt-font-size'),
            styleBtns: document.querySelectorAll('.txt-btn-style'),
            hyperlink: document.getElementById('txt-link'),
            newTab: document.getElementById('txt-new-tab')
        };
    }

    getBtnProps() {
        return {
            btnProps: document.querySelector('.btn-props'),
            bgColor: document.getElementById('btn-color'),
            textColor: document.getElementById('btn-font-color'),
            fontFamily: document.getElementById('btn-font-family'),
            fontSize: document.getElementById('btn-font-size'),
            textContent: document.getElementById('btn-text'),
            hyperlink: document.getElementById('btn-hyperlink'),
            shape: document.getElementById('btn-shape'),
            newTab: document.getElementById('btn-new-tab'),
            alignBtns: document.querySelectorAll('.btn-align')
        };
    }

    getSocialProps() {
        return {
            socialProps: document.querySelector('.social-props'),
            fbLink: document.getElementById('fb-link'),
            twitterLink: document.getElementById('twitter-link'),
            instagramLink: document.getElementById('instagram-link')
        };
    }

    getImgProps() {
        return {
            imgProps: document.querySelector('.img-props'),
            input: document.getElementById('img-input'),
            preview: document.getElementById('img-preview'),
            link: document.getElementById('img-link'),
            newTab: document.getElementById('img-new-tab')
        };
    }

    getSpaceProps() {
        return {
            spxProps: document.querySelector('.spx-props'),
            height: document.getElementById('spx-height')
        };
    }
}