import puppeteer from 'puppeteer'
import { mkdirSync } from 'fs'

mkdirSync('screenshots', { recursive: true })

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })

const desktop = await browser.newPage()
await desktop.setViewport({ width: 1440, height: 900 })
await desktop.goto('https://groomer-template.vercel.app', { waitUntil: 'networkidle2', timeout: 30000 })
await new Promise(r => setTimeout(r, 1500))
await desktop.screenshot({ path: 'screenshots/desktop.png', fullPage: false })
console.log('âœ“ desktop.png saved')

const mobile = await browser.newPage()
await mobile.setViewport({ width: 390, height: 844 })
await mobile.goto('https://groomer-template.vercel.app', { waitUntil: 'networkidle2', timeout: 30000 })
await new Promise(r => setTimeout(r, 1500))
await mobile.screenshot({ path: 'screenshots/mobile.png', fullPage: false })
console.log('âœ“ mobile.png saved')

await browser.close()

