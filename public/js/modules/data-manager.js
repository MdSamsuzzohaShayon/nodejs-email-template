// data-manager.js - Data Management

export class DataManager {
    constructor() {
        this.rowList = [];
        this.positionElement = [];
        this.siblingButtonList = [];
        this.rowID = 1;
        this.selectedRow = null;
        this.selectedCol = null;
        this.selectedAfterRow = null;
        this.formData = new FormData();
    }
    
    addRow(rowWithColumn) {
        this.rowList.push({ rowID: this.rowID, rowWithColumn });
        this.rowID++;
    }
    
    addBlock(blockData) {
        this.positionElement.push(blockData);
    }
    
    addButton(buttonData) {
        this.siblingButtonList.push(buttonData);
    }
    
    updateBlock(rowNumber, columnNumber, updates) {
        const index = this.positionElement.findIndex(
            p => p.rowNumber === rowNumber && p.columnNumber === columnNumber
        );
        if (index !== -1) {
            Object.assign(this.positionElement[index].blockElement, updates);
        }
    }
    
    updateButton(rowNumber, columnNumber, updates) {
        const index = this.siblingButtonList.findIndex(
            b => b.rowNum === rowNumber && b.colNum === columnNumber
        );
        if (index !== -1) {
            Object.assign(this.siblingButtonList[index], updates);
        }
    }
    
    getBlock(rowNumber, columnNumber) {
        return this.positionElement.find(
            p => p.rowNumber === rowNumber && p.columnNumber === columnNumber
        );
    }
    
    getButton(rowNumber, columnNumber) {
        return this.siblingButtonList.find(
            b => b.rowNum === rowNumber && b.colNum === columnNumber
        );
    }
    
    deleteRow(rowNumber) {
        // Remove from rowList
        const rowIndex = this.rowList.findIndex(r => r.rowID === rowNumber);
        if (rowIndex !== -1) {
            this.rowList.splice(rowIndex, 1);
        }
        
        // Update row IDs
        this.rowList.forEach(r => {
            if (r.rowID > rowNumber) r.rowID--;
        });
        
        // Remove blocks in this row
        this.positionElement = this.positionElement.filter(p => p.rowNumber !== rowNumber);
        this.positionElement.forEach(p => {
            if (p.rowNumber > rowNumber) p.rowNumber--;
        });
        
        // Remove buttons in this row
        this.siblingButtonList = this.siblingButtonList.filter(b => b.rowNum !== rowNumber);
        this.siblingButtonList.forEach(b => {
            if (b.rowNum > rowNumber) b.rowNum--;
        });
        
        this.rowID--;
    }
    
    moveRowUp(rowNumber) {
        if (rowNumber <= 1) return false;
        
        const rowIndex = this.rowList.findIndex(r => r.rowID === rowNumber);
        const prevRowIndex = this.rowList.findIndex(r => r.rowID === rowNumber - 1);
        
        if (rowIndex !== -1 && prevRowIndex !== -1) {
            [this.rowList[rowIndex], this.rowList[prevRowIndex]] = 
            [this.rowList[prevRowIndex], this.rowList[rowIndex]];
            
            this.rowList[rowIndex].rowID = rowNumber;
            this.rowList[prevRowIndex].rowID = rowNumber - 1;
        }
        
        this.positionElement.forEach(p => {
            if (p.rowNumber === rowNumber) p.rowNumber = rowNumber - 1;
            else if (p.rowNumber === rowNumber - 1) p.rowNumber = rowNumber;
        });
        
        this.siblingButtonList.forEach(b => {
            if (b.rowNum === rowNumber) b.rowNum = rowNumber - 1;
            else if (b.rowNum === rowNumber - 1) b.rowNum = rowNumber;
        });
        
        return true;
    }
    
    moveRowDown(rowNumber) {
        if (rowNumber >= this.rowID - 1) return false;
        
        const rowIndex = this.rowList.findIndex(r => r.rowID === rowNumber);
        const nextRowIndex = this.rowList.findIndex(r => r.rowID === rowNumber + 1);
        
        if (rowIndex !== -1 && nextRowIndex !== -1) {
            [this.rowList[rowIndex], this.rowList[nextRowIndex]] = 
            [this.rowList[nextRowIndex], this.rowList[rowIndex]];
            
            this.rowList[rowIndex].rowID = rowNumber;
            this.rowList[nextRowIndex].rowID = rowNumber + 1;
        }
        
        this.positionElement.forEach(p => {
            if (p.rowNumber === rowNumber) p.rowNumber = rowNumber + 1;
            else if (p.rowNumber === rowNumber + 1) p.rowNumber = rowNumber;
        });
        
        this.siblingButtonList.forEach(b => {
            if (b.rowNum === rowNumber) b.rowNum = rowNumber + 1;
            else if (b.rowNum === rowNumber + 1) b.rowNum = rowNumber;
        });
        
        return true;
    }
    
    addSpace(afterRow, height = 12) {
        this.rowList.push({ afterRow, spaceRow: height });
    }
    
    updateSpace(afterRow, height) {
        const index = this.rowList.findIndex(r => r.afterRow === afterRow);
        if (index !== -1) {
            this.rowList[index].spaceRow = height;
        }
    }
    
    getSpace(afterRow) {
        return this.rowList.find(r => r.afterRow === afterRow);
    }
    
    prepareFormData(title, bgColor, linkColor) {
        this.formData.append("title", title);
        this.formData.append('bgColor', bgColor);
        this.formData.append('linkColor', linkColor);
        this.formData.append('layout', JSON.stringify(this.rowList));
        this.formData.append('element', JSON.stringify(this.positionElement));
        this.formData.append('sibling', JSON.stringify(this.siblingButtonList));
        return this.formData;
    }
    
    reset() {
        this.rowList = [];
        this.positionElement = [];
        this.siblingButtonList = [];
        this.rowID = 1;
        this.selectedRow = null;
        this.selectedCol = null;
        this.selectedAfterRow = null;
        this.formData = new FormData();
    }
}