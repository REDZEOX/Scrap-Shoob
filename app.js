const puppeteer = require('puppeteer-extra').default
const express = require('express')
const plugin = require('puppeteer-extra-plugin-stealth')

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => res.status(200).setHeader('Content-Type', 'text/plain').send('Running...').end())

app.get('/scrap', async (req, res) => {
    if (!req.query.id) return void res.sendStatus(404)
    const { id } = req.query
    const url = `https://shoob.gg/cards/info/${id}`
    console.log(url)
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--incognito', '--single-process', '--no-zygote'],
        defaultViewport: null,
      })
      const page = await browser.newPage()
      await page.goto(url).then(async () => {
        const data = await page.evaluate(() => document.querySelector('*').outerHTML)
        await browser.close()
        res.status(200).setHeader('Content-Type', 'text/plain').send(data).end()
      }).catch(async () => {
        await browser.close()
        res.sendStatus(404)
      })
})

app.get('/random', async (req, res) => {
  const url = 'https://mywaifulist.moe/random'
  puppeteer.use(plugin())
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--incognito', '--single-process', '--no-zygote'],
    defaultViewport: null,
  })
  const page = await browser.newPage()
  await page.goto(url).then(async () => {
    const data = await page.evaluate(() => document.querySelector('*').outerHTML)
    await browser.close()
    res.status(200).setHeader('Content-Type', 'text/plain').send(data).end()
  }).catch(async () => {
    await browser.close()
    res.sendStatus(404)
  })
})

app.get('/raw', async (req, res) => {
  if (!req.query.url) return void res.sendStatus(404)
  const { url } = req.query
  puppeteer.use(plugin())
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--incognito', '--single-process', '--no-zygote'],
    defaultViewport: null,
  })
  const page = await browser.newPage()
  await page.goto(url).then(async () => {
    const data = await page.evaluate(() => document.querySelector('*').outerHTML)
    await browser.close()
    res.status(200).setHeader('Content-Type', 'text/plain').send(data).end()
  }).catch(async () => {
    await browser.close()
    res.sendStatus(404)
  })
})

app.get('/get', async (req, res) => {
  if (!req.query.slug) return void res.sendStatus(404)
  const { slug } = req.query
  const url = `https://mywaifulist.moe/waifu/${slug}`
  puppeteer.use(plugin())
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--incognito', '--single-process', '--no-zygote'],
    defaultViewport: null,
  })
  const page = await browser.newPage()
  await page.goto(url).then(async () => {
    const data = await page.evaluate(() => document.querySelector('*').outerHTML)
    await browser.close()
    res.status(200).setHeader('Content-Type', 'text/plain').send(data).end()
  }).catch(async () => {
    await browser.close()
    res.sendStatus(404)
  })
})

app.all('*', (req, res) => res.sendStatus(404))

app.listen(PORT, () => console.log(`Server started on PORT : ${PORT}`))