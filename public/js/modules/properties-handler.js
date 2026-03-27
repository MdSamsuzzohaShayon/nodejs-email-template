// properties-handler.js - Property Panel Logic

import { DOMElements } from './dom-elements.js';
import { DataManager } from './data-manager.js';
import { Utils } from './utils.js';
import { DEFAULT_BUTTON_STYLES, APP_CONFIG } from './constants.js';

export class PropertiesHandler {
    constructor(templateBuilder, dataManager) {
        this.dom = new DOMElements();
        this.data = dataManager;
        this.templateBuilder = templateBuilder;
        this.selectedRow = null;
        this.selectedCol = null;
        this.selectedAfterRow = null;

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.setupPropertyPanel();
        this.setupRowProperties();
        this.setupTextProperties();
        this.setupButtonProperties();
        this.setupSocialProperties();
        this.setupImageProperties();
        this.setupSpaceProperties();
        this.setupTemplateProperties();
    }

    setupPropertyPanel() {
        this.templateBuilder.addEventListener('click', (e) => {
            const target = e.target;

            // Check for content block click
            if (this.isContentBlock(target)) {
                this.showPropertiesForBlock(target);
            }

            // Check for space click
            if (target.classList.contains('space-row-grid')) {
                this.showPropertiesForSpace(target);
            }

            // Check for row click
            if (target.classList.contains('drop-row') || target.closest('.drop-row')) {
                this.showPropertiesForRow(target);
            }

            // Check for click outside
            if (this.isClickOutside(target)) {
                this.hideAllProperties();
            }
        });

        // Text selection handler
        document.addEventListener('selectionchange', () => {
            const selection = window.getSelection();
            const anchorNode = selection.anchorNode;
            if (anchorNode && anchorNode.parentElement) {
                const textBlock = anchorNode.parentElement.closest('.txt-content-block');
                if (textBlock) {
                    const id = textBlock.id;
                    const parts = id.split('-');
                    this.selectedRow = parseInt(parts[1]);
                    this.selectedCol = parseInt(parts[2]);
                    this.showPropertyPanel('txt-props');
                }
            }
        });
    }

    isContentBlock(target) {
        return target.classList.contains('img-content-block') ||
            target.classList.contains('txt-content-block') ||
            target.classList.contains('icon-content-block') ||
            target.classList.contains('btn-content-block') ||
            target.closest('.txt-content-block') ||
            target.closest('.icon-content-block') ||
            target.classList.contains('btn-content-link');
    }

    showPropertiesForBlock(target) {
        let element = target;
        let blockType = '';

        if (target.classList.contains('img-content-block')) {
            blockType = 'img-props';
            element = target;
        } else if (target.classList.contains('txt-content-block') || target.closest('.txt-content-block')) {
            blockType = 'txt-props';
            element = target.closest('.txt-content-block') || target;
        } else if (target.classList.contains('icon-content-block') || target.closest('.icon-content-block')) {
            blockType = 'social-props';
            element = target.closest('.icon-content-block') || target;
        } else if (target.classList.contains('btn-content-block') || target.classList.contains('btn-content-link')) {
            blockType = 'btn-props';
            element = target.closest('.btn-content-block') || target;
        }

        const id = element.id;
        if (id) {
            const parts = id.split('-');
            this.selectedRow = parseInt(parts[1]);
            this.selectedCol = parseInt(parts[2]);
            this.showPropertyPanel(blockType);
            this.loadBlockProperties(blockType);
        }
    }

    showPropertiesForSpace(target) {
        this.selectedAfterRow = Utils.stringIdToNumber(target.id, 1);
        this.showPropertyPanel('spx-props');
        const spaceData = this.data.getSpace(this.selectedAfterRow);
        if (spaceData) {
            document.getElementById('spx-height').value = spaceData.spaceRow;
        }
    }

    showPropertiesForRow(target) {
        const rowElement = target.closest('.drop-row');
        if (rowElement) {
            this.selectedRow = Utils.stringIdToNumber(rowElement.id, 1);
            this.showPropertyPanel('row-props');
        }
    }

    isClickOutside(target) {
        return target.classList.contains('template-wrapper') ||
            target.classList.contains('header-image') ||
            target.classList.contains('col-10') ||
            target.classList.contains('col-6');
    }

    showPropertyPanel(panelName) {
        this.dom.propertiesBar.style.display = 'block';
        this.dom.blockElementBar.style.display = 'none';
        this.dom.allProperties.forEach(prop => prop.style.display = 'none');

        const panel = document.querySelector(`.${panelName}`);
        if (panel) panel.style.display = 'block';
    }

    hideAllProperties() {
        this.dom.allProperties.forEach(prop => prop.style.display = 'none');
        this.dom.propertiesBar.style.display = 'none';
        this.dom.blockElementBar.style.display = 'block';
        this.selectedRow = null;
        this.selectedCol = null;
        this.selectedAfterRow = null;
    }

    loadBlockProperties(blockType) {
        if (blockType === 'img-props') {
            const block = this.data.getBlock(this.selectedRow, this.selectedCol);
            if (block && block.blockElement.name === 'imgBlockContent') {
                document.getElementById('img-link').value = block.blockElement.imgHyperlink || '';
                document.getElementById('img-new-tab').checked = block.blockElement.imgNewTab || false;
            }
        } else if (blockType === 'social-props') {
            const block = this.data.getBlock(this.selectedRow, this.selectedCol);
            if (block && block.blockElement.name === 'socialBlockContent') {
                document.getElementById('fb-link').value = block.blockElement.socialFbHyperlink || '';
                document.getElementById('twitter-link').value = block.blockElement.socialTwitterHyperlink || '';
                document.getElementById('instagram-link').value = block.blockElement.socialInstagramHyperlink || '';
            }
        } else if (blockType === 'btn-props') {
            const button = this.data.getButton(this.selectedRow, this.selectedCol);
            if (button) {
                document.getElementById('btn-font-size').value = button.btnFontSize || 12;
                document.getElementById('btn-font-family').value = button.btnFontFamily || 'Helvetica';
                document.getElementById('btn-color').value = button.btnBgColor || '#4685c0';
                document.getElementById('btn-font-color').value = button.btnTextColor || '#0f3050';
                document.getElementById('btn-text').value = button.btnContent || '';
                document.getElementById('btn-hyperlink').value = button.btnHyperlink || '';
                document.getElementById('btn-new-tab').checked = button.btnOpenNewTab || false;
                document.getElementById('btn-shape').checked = button.btnRound || false;
            }
        }
    }

    setupRowProperties() {
        const { moveUp, moveDown, delete: deleteBtn } = this.dom.getRowProps();

        deleteBtn?.addEventListener('click', () => {
            if (this.selectedRow) {
                const rowElement = document.getElementById(`row-${this.selectedRow}`);
                if (rowElement) {
                    this.data.deleteRow(this.selectedRow);
                    this.updateRowIdsAfterDelete(rowElement);
                    this.hideAllProperties();
                }
            }
        });

        moveUp?.addEventListener('click', () => {
            if (this.selectedRow && this.data.moveRowUp(this.selectedRow)) {
                this.swapRowElements(this.selectedRow, this.selectedRow - 1);
                this.selectedRow--;
                this.hideAllProperties();
            } else if (this.selectedRow === 1) {
                Utils.showToast("First row can't be moved up", "error");
            }
        });

        moveDown?.addEventListener('click', () => {
            if (this.selectedRow && this.data.moveRowDown(this.selectedRow)) {
                this.swapRowElements(this.selectedRow, this.selectedRow + 1);
                this.selectedRow++;
                this.hideAllProperties();
            } else if (this.selectedRow === this.data.rowID - 1) {
                Utils.showToast("Last row can't be moved down", "error");
            }
        });
    }

    updateRowIdsAfterDelete(deletedRow) {
        let nextElements = Utils.getAllNextSiblings(deletedRow);
        let currentNumber = this.selectedRow;

        nextElements.forEach(element => {
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

        deletedRow.remove();
    }

    swapRowElements(row1Num, row2Num) {
        const row1 = document.getElementById(`row-${row1Num}`);
        const row2 = document.getElementById(`row-${row2Num}`);

        if (row1 && row2) {
            row1.parentNode.insertBefore(row2, row1);
        }
    }

    setupTextProperties() {
        const txtProps = this.dom.getTxtProps();

        txtProps.alignBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const cmd = btn.dataset['align'];
                document.execCommand(cmd, false, null);
                this.updateTextBlock();
            });
        });

        txtProps.styleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const cmd = btn.dataset['style'];
                document.execCommand(cmd, false, null);
                this.updateTextBlock();
            });
        });

        txtProps.fontFamily.addEventListener('change', (e) => {
            document.execCommand("fontName", false, e.target.value);
            this.updateTextBlock();
        });

        txtProps.fontSize.addEventListener('change', (e) => {
            document.execCommand("fontSize", false, e.target.value);
            this.updateTextBlock();
        });

        txtProps.hyperlink.addEventListener('change', (e) => {
            document.execCommand("createLink", false, e.target.value);
            this.updateTextBlock();
        });
    }

    updateTextBlock() {
        if (this.selectedRow && this.selectedCol) {
            const textElement = document.getElementById(`txt-${this.selectedRow}-${this.selectedCol}`);
            if (textElement) {
                const updatedHtml = textElement.outerHTML;
                this.data.updateBlock(this.selectedRow, this.selectedCol, { blockHtml: updatedHtml });
            }
        }
    }

    setupButtonProperties() {
        const btnProps = this.dom.getBtnProps();

        btnProps.fontSize.addEventListener('change', (e) => {
            const button = document.getElementById(`btn-${this.selectedRow}-${this.selectedCol}`);
            if (button) {
                button.style.fontSize = e.target.value + 'px';
                this.data.updateButton(this.selectedRow, this.selectedCol, { btnFontSize: parseInt(e.target.value) });
            }
        });

        btnProps.fontFamily.addEventListener('change', (e) => {
            const button = document.getElementById(`btn-${this.selectedRow}-${this.selectedCol}`);
            if (button) {
                button.style.fontFamily = e.target.value;
                this.data.updateButton(this.selectedRow, this.selectedCol, { btnFontFamily: e.target.value });
            }
        });

        btnProps.bgColor.addEventListener('change', (e) => {
            const button = document.getElementById(`btn-${this.selectedRow}-${this.selectedCol}`);
            if (button) {
                button.style.backgroundColor = e.target.value;
                this.data.updateButton(this.selectedRow, this.selectedCol, { btnBgColor: e.target.value });
            }
        });

        btnProps.textColor.addEventListener('change', (e) => {
            const button = document.getElementById(`btn-${this.selectedRow}-${this.selectedCol}`);
            if (button && button.firstChild) {
                button.firstChild.style.color = e.target.value;
                this.data.updateButton(this.selectedRow, this.selectedCol, { btnTextColor: e.target.value });
            }
        });

        btnProps.textContent.addEventListener('change', (e) => {
            const button = document.getElementById(`btn-${this.selectedRow}-${this.selectedCol}`);
            if (button && button.firstChild) {
                button.firstChild.textContent = e.target.value;
                this.data.updateButton(this.selectedRow, this.selectedCol, { btnContent: e.target.value });
            }
        });

        btnProps.hyperlink.addEventListener('change', (e) => {
            this.data.updateButton(this.selectedRow, this.selectedCol, { btnHyperlink: e.target.value });
        });

        btnProps.newTab.addEventListener('change', (e) => {
            this.data.updateButton(this.selectedRow, this.selectedCol, { btnOpenNewTab: e.target.checked });
        });

        btnProps.shape.addEventListener('change', (e) => {
            const button = document.getElementById(`btn-${this.selectedRow}-${this.selectedCol}`);
            if (button) {
                button.style.borderRadius = e.target.checked ? '8px' : '0';
                this.data.updateButton(this.selectedRow, this.selectedCol, { btnRound: e.target.checked });
            }
        });

        btnProps.alignBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const button = document.getElementById(`btn-${this.selectedRow}-${this.selectedCol}`);
                if (button) {
                    let alignment = 'inherit';
                    if (e.target.parentElement.id === 'btn-align-left') alignment = 'left';
                    if (e.target.parentElement.id === 'btn-align-right') alignment = 'right';
                    button.style.float = alignment;
                    this.data.updateButton(this.selectedRow, this.selectedCol, { btnAlign: alignment });
                }
            });
        });
    }

    setupSocialProperties() {
        const socialProps = this.dom.getSocialProps();

        socialProps.fbLink.addEventListener('change', (e) => {
            this.data.updateBlock(this.selectedRow, this.selectedCol, { socialFbHyperlink: e.target.value });
        });

        socialProps.twitterLink.addEventListener('change', (e) => {
            this.data.updateBlock(this.selectedRow, this.selectedCol, { socialTwitterHyperlink: e.target.value });
        });

        socialProps.instagramLink.addEventListener('change', (e) => {
            this.data.updateBlock(this.selectedRow, this.selectedCol, { socialInstagramHyperlink: e.target.value });
        });
    }

    setupImageProperties() {
        const imgProps = this.dom.getImgProps();

        imgProps.input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (Utils.validateImage(file)) {
                const reader = new FileReader();
                reader.addEventListener('load', (le) => {
                    const imgElement = document.getElementById(`img-${this.selectedRow}-${this.selectedCol}`);
                    if (imgElement) {
                        imgElement.src = le.target.result;
                        imgProps.preview.src = le.target.result;
                    }
                    this.data.updateBlock(this.selectedRow, this.selectedCol, { imgUrl: le.target.result });
                });
                reader.readAsDataURL(file);
                this.data.formData.append(`img-${this.selectedRow}-${this.selectedCol}`, file);
            }
        });

        imgProps.link.addEventListener('change', (e) => {
            this.data.updateBlock(this.selectedRow, this.selectedCol, { imgHyperlink: e.target.value });
        });

        imgProps.newTab.addEventListener('change', (e) => {
            this.data.updateBlock(this.selectedRow, this.selectedCol, { imgNewTab: e.target.checked });
        });
    }

    setupSpaceProperties() {
        const spaceProps = this.dom.getSpaceProps();

        spaceProps.height.addEventListener('change', (e) => {
            if (this.selectedAfterRow) {
                const space = document.getElementById(`spx-${this.selectedAfterRow}-after`);
                if (space) {
                    space.style.height = e.target.value + 'px';
                    this.data.updateSpace(this.selectedAfterRow, parseInt(e.target.value));
                }
            }
        });
    }

    setupTemplateProperties() {
        // Header image upload
        this.dom.headerImgInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (Utils.validateImage(file)) {
                const reader = new FileReader();
                reader.addEventListener('load', (le) => {
                    this.dom.headerImage.src = le.target.result;
                    this.dom.headerImgPreview.src = le.target.result;
                    this.dom.headerImgPreview.style.display = 'inline-block';
                    this.dom.deleteHeaderImg.style.display = 'inline-block';
                    this.dom.headerImage.style.display = 'block';
                });
                reader.readAsDataURL(file);
                this.data.formData.append('headerImg', file);
            }
        });

        // Background color
        this.dom.templateBGColorInput.addEventListener('change', (e) => {
            this.dom.templateWrapper.style.background = e.target.value;
        });

        // Link color
        this.dom.templateLinkColorInput.addEventListener('change', (e) => {
            const links = document.getElementsByTagName('a');
            Array.from(links).forEach(link => {
                link.style.color = e.target.value;
            });
        });

        // Delete header image
        this.dom.deleteHeaderImg.addEventListener('click', () => {
            this.dom.headerImgPreview.style.display = 'none';
            this.dom.deleteHeaderImg.style.display = 'none';
            this.dom.headerImage.style.display = 'none';
            this.dom.headerImage.src = APP_CONFIG.DEFAULT_HEADER;
            this.data.formData.set('headerImg', 'header-deleted');
        });
    }
}