// constants.js - Application Constants and Configuration

export const APP_CONFIG = {
    WEBSITE_DOMAIN: "http://" + window.location.host,
    MAX_ROWS: 9,
    MAX_IMAGE_SIZE: 2097152, // 2MB
    ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/jpg", "image/png", "image/gif"],
    DEFAULT_IMAGE: "/img/empty-image.png",
    DEFAULT_HEADER: "/img/header.png",
    DEFAULT_BTN_TEXT: "Preview",
    DEFAULT_FB_LINK: "fb.com/md.shayon.148",
    DEFAULT_TWITTER_LINK: "twitter.com/shayon_md",
    DEFAULT_INSTA_LINK: "https://www.instagram.com/md_shayon/"
};

export const URL_CONFIG = {
    getAddUrl: () => `${APP_CONFIG.WEBSITE_DOMAIN}/template/add`,
    getEditUrl: (templateId) => `${APP_CONFIG.WEBSITE_DOMAIN}/template/edit/${templateId}/?_method=PUT`
};

export const DEFAULT_BUTTON_STYLES = {
    bgColor: "rgb(70, 133, 192)",
    textColor: "rgb(15, 48, 80)",
    fontFamily: "Helvetica",
    fontSize: 12,
    borderRadius: "0",
    align: "inherit"
};

export const SOCIAL_ICONS = {
    facebook: '/icon/facebook.png',
    twitter: '/icon/twitter.png',
    instagram: '/icon/instagram.png'
};