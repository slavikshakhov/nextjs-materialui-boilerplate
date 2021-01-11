const NextI18Next = require('next-i18next').default
const path = require('path')
module.exports = new NextI18Next({
    otherLanguages: ['es'],
    defaultNS: 'common',
    localeSubpaths: {
        es: 'es'      
    },
    localePath: path.resolve('./public/static/locales')

})

/*
const NextI18Next = require('next-i18next').default
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig
const path = require('path')

module.exports = new NextI18Next({
  otherLanguages: ['de'],
  localeSubpaths,
  localePath: path.resolve('./public/static/locales')
})

*/