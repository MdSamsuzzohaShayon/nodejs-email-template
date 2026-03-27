// api-service.js - API Communication

import { Utils } from './utils.js';
import { URL_CONFIG } from './constants.js';

export class APIService {
    static async saveTemplate(formData, templateId = null) {
        const url = templateId ? URL_CONFIG.getEditUrl(templateId) : URL_CONFIG.getAddUrl();
        const method = templateId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            Utils.showToast('Failed to save template. Please try again.', 'error');
            throw error;
        }
    }

    static async loadTemplate(templateId) {
        try {
            const response = await fetch(`${URL_CONFIG.WEBSITE_DOMAIN}/api/templates/${templateId}`);
            if (!response.ok) throw new Error('Failed to load template');
            return await response.json();
        } catch (error) {
            console.error('Load Error:', error);
            Utils.showToast('Failed to load template', 'error');
            throw error;
        }
    }
}