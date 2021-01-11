const path = require('path')
require('dotenv').config()
const { nextI18NextRewrites } = require('next-i18next/rewrites')

const localeSubpaths = {
    es: 'es'    
}

module.exports = {
    rewrites: async () => nextI18NextRewrites(localeSubpaths),
    env: {
        API_URL: process.env.API_URL,
        IMAGES_DOMAIN: process.env.IMAGES_DOMAIN
    },
    publicRuntimeConfig: {
        API_URL: process.env.API_URL,
        IMAGES_DOMAIN: process.env.IMAGES_DOMAIN
    },
    images: {
        domains: [process.env.IMAGES_DOMAIN],
        loader: 'default',
        path: '/_next/image',
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
    },
}