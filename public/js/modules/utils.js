// utils.js - Helper Functions

import { APP_CONFIG, SOCIAL_ICONS } from './constants.js';

export class Utils {
    static setAttributes(element, attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
    }

    static validateImage(file) {
        if (!file) return false;
        if (file.size > APP_CONFIG.MAX_IMAGE_SIZE) {
            alert("File size must be under 2MB!");
            return false;
        }
        if (!APP_CONFIG.ALLOWED_IMAGE_TYPES.includes(file.type)) {
            alert('Use a supported image file (.png / .jpeg / .gif / .jpg)');
            return false;
        }
        return true;
    }

    static stringIdToNumber(idString, position) {
        const parts = idString.toString().split('-');
        return parseInt(parts[position]);
    }

    static rowIdToNumber(rowId) {
        const prefix = rowId.split('-')[0];
        const mapping = { one: 1, two: 2, three: 3 };
        return mapping[prefix] || null;
    }

    static rowNumberToString(rowNumber) {
        const mapping = { 1: 'one', 2: 'two', 3: 'three' };
        return mapping[rowNumber] || null;
    }

    static validateProtocol(hyperlink) {
        if (!hyperlink) return '#';
        const trimmed = hyperlink.toString().trim();
        if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
            return trimmed;
        }
        return `http://${trimmed}`;
    }

    static htmlToNode(html) {
        return new DOMParser().parseFromString(html, 'text/html').body.childNodes[0];
    }

    static getCloudinaryUrl(imageKey) {
        if (!imageKey || imageKey === APP_CONFIG.DEFAULT_IMAGE) return APP_CONFIG.DEFAULT_IMAGE;
        return `https://res.cloudinary.com/shayon-cloud/image/upload/v1694767526/${imageKey}`;
    }

    static getAllNextSiblings(element) {
        const siblings = [];
        const getNext = (el) => {
            if (el !== null) {
                siblings.push(el);
                const next = el.nextElementSibling;
                if (next !== null) getNext(next);
            }
        };
        getNext(element.nextElementSibling);
        return siblings;
    }

    static getDropPosition(element, event) {
        const rect = element.getBoundingClientRect();
        const y = event.clientY - rect.top;
        return y > element.offsetHeight / 2;
    }

    static getParentChain(element) {
        const chain = [];
        let current = element;
        while (current) {
            chain.unshift(current);
            current = current.parentNode;
        }
        return chain;
    }

    static createSocialIcons(container, fbLink, twitterLink, instagramLink) {
        const links = [fbLink, twitterLink, instagramLink];
        const icons = [SOCIAL_ICONS.facebook, SOCIAL_ICONS.twitter, SOCIAL_ICONS.instagram];

        links.forEach((link, index) => {
            const anchor = document.createElement('a');
            this.setAttributes(anchor, { class: "social-icon-content", href: link || '#' });
            const img = document.createElement('img');
            this.setAttributes(img, { class: "social-icon-img", src: icons[index] });
            anchor.appendChild(img);
            container.appendChild(anchor);
        });

        return container;
    }

    static showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        const iconMap = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
        toast.innerHTML = `
            <i class="fas ${iconMap[type]} ${type}"></i>
            <p class="toast-message">${message}</p>
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    static replaceAt(str, index, replacement) {
        return str.substring(0, index) + replacement + str.substring(index + 1);
    }
}