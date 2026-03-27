// template-builder.js - Template Building Logic

import { DOMElements } from './dom-elements.js';
import { DataManager } from './data-manager.js';
import { Utils } from './utils.js';
import { APP_CONFIG, DEFAULT_BUTTON_STYLES } from './constants.js';

export class TemplateBuilder {
    constructor() {
        this.dom = new DOMElements();
        this.data = new DataManager();
        this.isDraggingColumn = false;
        this.isDraggingBlock = false;
        this.dropableColumn = null;
        this.dropableBlock = null;
        this.resizeObserver = null;
        
        this.initResizeObserver();
    }
    
    initResizeObserver() {
        this.resizeObserver = new ResizeObserver(entries => {
            const dropRows = this.dom.dropColumnZone.querySelectorAll('.drop-row');
            if (dropRows.length) {
                let totalHeight = 0;
                dropRows.forEach(row => totalHeight += row.clientHeight);
                const difference = entries[0].contentRect.height - totalHeight;
                if (difference < 127) {
                    this.dom.dropColumnZone.style.minHeight = totalHeight + 127 + "px";
                }
            }
        });
        this.resizeObserver.observe(this.dom.dropColumnZone);
    }
    
    createRow(dropableColumnType, rowNumber) {
        const rowDiv = document.createElement('div');
        const columnCount = dropableColumnType === 'col-1-grid' ? 1 :
                           dropableColumnType === 'col-2-grid' ? 2 : 3;
        
        Utils.setAttributes(rowDiv, { class: "drop-row", id: `row-${rowNumber}` });
        
        for (let i = 0; i < columnCount; i++) {
            const colDiv = document.createElement('div');
            const colClass = columnCount === 1 ? 'one-column-div' :
                            columnCount === 2 ? 'two-column-div' : 'three-column-div';
            Utils.setAttributes(colDiv, { class: colClass, id: `${colClass.split('-')[0]}-col-${i}-${rowNumber}` });
            rowDiv.appendChild(colDiv);
        }
        
        return { rowDiv, columnCount };
    }
    
    createImageBlock(rowNumber, columnNumber, imageUrl = APP_CONFIG.DEFAULT_IMAGE) {
        const anchor = document.createElement('a');
        Utils.setAttributes(anchor, { class: "img-block-href", href: "#" });
        
        const img = document.createElement('img');
        Utils.setAttributes(img, {
            alt: "Image",
            id: `img-${rowNumber}-${columnNumber}`,
            src: imageUrl,
            style: "width: 96%; height: auto;"
        });
        img.className = "content img-content-block";
        anchor.appendChild(img);
        
        return anchor;
    }
    
    createTextBlock(rowNumber, columnNumber, content = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil corrupti natus eos in a voluptas incidunt porro quis autem quo!') {
        const div = document.createElement('div');
        Utils.setAttributes(div, {
            id: `txt-${rowNumber}-${columnNumber}`,
            contenteditable: true
        });
        div.className = 'content txt-content-block';
        div.textContent = content;
        
        div.addEventListener('input', (e) => {
            if (e.inputType === 'insertFromPaste') {
                const styledElements = e.target.querySelectorAll('[style]');
                styledElements.forEach(el => {
                    el.style.cssText = 'height:100%;width:100%;background:transparent;overflow:hidden;margin:auto 0;';
                });
            }
            const updatedHtml = e.target.outerHTML;
            this.data.updateBlock(rowNumber, columnNumber, { blockHtml: updatedHtml });
        });
        
        return div;
    }
    
    createButtonBlock(rowNumber, columnNumber, buttonData = {}) {
        const button = document.createElement('button');
        Utils.setAttributes(button, { id: `btn-${rowNumber}-${columnNumber}` });
        button.className = "content btn-content-block";
        
        const link = document.createElement('a');
        Utils.setAttributes(link, { class: "btn-content-link", href: "#" });
        link.textContent = buttonData.content || APP_CONFIG.DEFAULT_BTN_TEXT;
        link.style.color = buttonData.textColor || DEFAULT_BUTTON_STYLES.textColor;
        
        button.appendChild(link);
        button.style.backgroundColor = buttonData.bgColor || DEFAULT_BUTTON_STYLES.bgColor;
        button.style.fontFamily = buttonData.fontFamily || DEFAULT_BUTTON_STYLES.fontFamily;
        button.style.fontSize = (buttonData.fontSize || DEFAULT_BUTTON_STYLES.fontSize) + 'px';
        
        return button;
    }
    
    createSocialBlock(rowNumber, columnNumber, links = {}) {
        const container = document.createElement('div');
        Utils.setAttributes(container, { id: `icon-${rowNumber}-${columnNumber}` });
        container.className = "content icon-content-block";
        
        return Utils.createSocialIcons(
            container,
            links.fbLink || APP_CONFIG.DEFAULT_FB_LINK,
            links.twitterLink || APP_CONFIG.DEFAULT_TWITTER_LINK,
            links.instagramLink || APP_CONFIG.DEFAULT_INSTA_LINK
        );
    }
    
    createSpaceBlock(afterRow, height = 12) {
        const space = document.createElement('div');
        Utils.setAttributes(space, { id: `spx-${afterRow}-after` });
        space.className = 'space space-row-grid';
        space.style.height = `${height}px`;
        return space;
    }
    
    insertRow(targetRowElement, event, dropableColumnType) {
        const insertAfter = Utils.getDropPosition(targetRowElement, event);
        const rowNumber = Utils.stringIdToNumber(targetRowElement.id, 1);
        const { rowDiv, columnCount } = this.createRow(dropableColumnType, insertAfter ? rowNumber : rowNumber);
        
        if (insertAfter) {
            targetRowElement.after(rowDiv);
            this.data.addRow(columnCount);
            this.updateNextRowIds(targetRowElement, rowNumber);
            this.data.moveRowUp?.(rowNumber + 1);
        } else {
            this.dom.dropColumnZone.insertBefore(rowDiv, targetRowElement);
            this.data.addRow(columnCount);
            this.updateNextRowIds(targetRowElement, rowNumber);
        }
        
        return rowDiv;
    }
    
    updateNextRowIds(startElement, startNumber) {
        let nextElements = Utils.getAllNextSiblings(startElement);
        let currentNumber = startNumber;
        
        [startElement, ...nextElements].forEach(element => {
            currentNumber++;
            Utils.setAttributes(element, { id: `row-${currentNumber}` });
            
            if (element.hasChildNodes()) {
                element.childNodes.forEach(col => {
                    if (col.hasChildNodes()) {
                        col.childNodes.forEach(block => {
                            const blockId = block.id || block.childNodes[0]?.id;
                            if (blockId) {
                                const newId = Utils.replaceAt(blockId, 4, currentNumber);
                                if (block.id) block.id = newId;
                                if (block.childNodes[0]?.id) block.childNodes[0].id = newId;
                            }
                        });
                    }
                });
            }
        });
    }
    
    setupDragAndDrop() {
        this.setupColumnDrag();
        this.setupBlockDrag();
        this.setupDropZone();
    }
    
    setupColumnDrag() {
        this.dom.getDraggableColumns().forEach(column => {
            column.addEventListener('dragstart', (e) => {
                this.isDraggingColumn = true;
                const classList = e.target.classList[1];
                if (classList === 'col-1-grid') this.dropableColumn = 'col-1-grid';
                else if (classList === 'col-2-grid') this.dropableColumn = 'col-2-grid';
                else if (classList === 'col-3-grid') this.dropableColumn = 'col-3-grid';
            });
        });
    }
    
    setupBlockDrag() {
        this.dom.getContentBlocks().forEach(block => {
            block.addEventListener('dragstart', (e) => {
                this.isDraggingBlock = true;
                const classList = e.target.classList[1];
                if (classList === 'img-holder') this.dropableBlock = 'img-holder';
                else if (classList === 'txt-holder') this.dropableBlock = 'txt-holder';
                else if (classList === 'social-holder') this.dropableBlock = 'social-holder';
                else if (classList === 'btn-holder') this.dropableBlock = 'btn-holder';
                else if (classList === 'spx-holder') this.dropableBlock = 'spx-holder';
            });
        });
    }
    
    setupDropZone() {
        this.dom.templateBuilder.addEventListener('dragover', (e) => {
            const target = e.target;
            if (target.classList.contains('two-column-div') || 
                target.classList.contains('one-column-div') || 
                target.classList.contains('three-column-div')) {
                target.style.backgroundColor = "rgba(102, 126, 234, 0.1)";
            }
            e.preventDefault();
        });
        
        this.dom.templateBuilder.addEventListener('dragleave', (e) => {
            const target = e.target;
            if (target.classList.contains('two-column-div') || 
                target.classList.contains('one-column-div') || 
                target.classList.contains('three-column-div')) {
                target.style.backgroundColor = "transparent";
            }
        });
        
        this.dom.templateBuilder.addEventListener('drop', (e) => {
            e.preventDefault();
            
            if (this.isDraggingColumn) {
                this.handleColumnDrop(e);
            } else if (this.isDraggingBlock) {
                this.handleBlockDrop(e);
            }
            
            this.resetDragState();
        });
    }
    
    handleColumnDrop(event) {
        let targetRow = null;
        const parentChain = Utils.getParentChain(event.target);
        
        for (let node of parentChain) {
            if (node.className === "drop-row") {
                targetRow = node;
                break;
            }
        }
        
        if (this.data.rowID <= APP_CONFIG.MAX_ROWS) {
            if (targetRow) {
                this.insertRow(targetRow, event, this.dropableColumn);
            } else {
                const { rowDiv, columnCount } = this.createRow(this.dropableColumn, this.data.rowID);
                this.dom.dropColumnZone.appendChild(rowDiv);
                this.data.addRow(columnCount);
            }
        } else {
            Utils.showToast("You can't add more than 9 rows", "error");
        }
    }
    
    handleBlockDrop(event) {
        const target = event.target;
        if (target.id === 'drop-zone' || 
            target.classList.contains('one-column-div') || 
            target.classList.contains('two-column-div') || 
            target.classList.contains('three-column-div')) {
            
            if (target.children.length >= 2) {
                Utils.showToast("Add another row to insert content", "error");
                return;
            }
            
            const rowElement = target.closest('.drop-row');
            if (!rowElement) return;
            
            const rowNumber = Utils.stringIdToNumber(rowElement.id, 1);
            const colNumber = Utils.stringIdToNumber(target.id, 2) + 1;
            
            this.insertContent(target, rowNumber, colNumber);
        }
    }
    
    insertContent(columnElement, rowNumber, columnNumber) {
        switch (this.dropableBlock) {
            case 'img-holder':
                if (columnElement.children.length === 0) {
                    const imgBlock = this.createImageBlock(rowNumber, columnNumber);
                    columnElement.appendChild(imgBlock);
                    this.data.addBlock({
                        rowNumber, columnNumber,
                        blockElement: {
                            name: "imgBlockContent",
                            blockHtml: "<a><img /></a>",
                            imgHyperlink: APP_CONFIG.WEBSITE_DOMAIN,
                            imgNewTab: false,
                            imgUrl: APP_CONFIG.DEFAULT_IMAGE
                        }
                    });
                } else {
                    Utils.showToast("You can't add multiple image blocks", "error");
                }
                break;
                
            case 'txt-holder':
                if (columnElement.children.length === 0) {
                    const textBlock = this.createTextBlock(rowNumber, columnNumber);
                    columnElement.appendChild(textBlock);
                    this.data.addBlock({
                        rowNumber, columnNumber,
                        blockElement: {
                            name: "txtBlockContent",
                            blockHtml: textBlock.outerHTML
                        }
                    });
                } else {
                    Utils.showToast("You can't add multiple text blocks", "error");
                }
                break;
                
            case 'btn-holder':
                const buttonData = {
                    content: APP_CONFIG.DEFAULT_BTN_TEXT,
                    bgColor: DEFAULT_BUTTON_STYLES.bgColor,
                    textColor: DEFAULT_BUTTON_STYLES.textColor
                };
                const buttonBlock = this.createButtonBlock(rowNumber, columnNumber, buttonData);
                columnElement.appendChild(buttonBlock);
                this.data.addButton({
                    rowNum: rowNumber,
                    colNum: columnNumber,
                    ...DEFAULT_BUTTON_STYLES,
                    btnContent: APP_CONFIG.DEFAULT_BTN_TEXT,
                    btnHyperlink: APP_CONFIG.WEBSITE_DOMAIN,
                    btnOpenNewTab: false
                });
                break;
                
            case 'social-holder':
                if (columnElement.children.length === 0) {
                    const socialBlock = this.createSocialBlock(rowNumber, columnNumber);
                    columnElement.appendChild(socialBlock);
                    this.data.addBlock({
                        rowNumber, columnNumber,
                        blockElement: {
                            name: "socialBlockContent",
                            blockHtml: "<div>social</div>",
                            socialFbHyperlink: APP_CONFIG.DEFAULT_FB_LINK,
                            socialTwitterHyperlink: APP_CONFIG.DEFAULT_TWITTER_LINK,
                            socialInstagramHyperlink: APP_CONFIG.DEFAULT_INSTA_LINK
                        }
                    });
                    
                    const rowElement = columnElement.closest('.drop-row');
                    if (rowElement && rowElement.classList.contains('one-column-div')) {
                        rowElement.style.height = "8em";
                    }
                } else {
                    Utils.showToast("You can't add multiple social icon blocks", "error");
                }
                break;
                
            case 'spx-holder':
                const spaceBlock = this.createSpaceBlock(rowNumber);
                columnElement.after(spaceBlock);
                this.data.addSpace(rowNumber);
                break;
        }
    }
    
    resetDragState() {
        this.isDraggingColumn = false;
        this.isDraggingBlock = false;
        this.dropableColumn = null;
        this.dropableBlock = null;
        
        const highlighted = document.querySelectorAll('.two-column-div, .one-column-div, .three-column-div');
        highlighted.forEach(el => el.style.backgroundColor = "transparent");
    }
}