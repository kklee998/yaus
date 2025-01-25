import { Hono } from 'hono'
import { validator } from 'hono/validator'
import {
  HTTPException
} from 'hono/http-exception'
import { index, errorPage } from './pages'


type Bindings = {
  YAUS_DB: D1Database
  HOST: string
}

const app = new Hono<{ Bindings: Bindings }>()

function generateSlug() {
  return Math.random().toString(36).substring(2, 8)
}

app.get('/', async (c) => {
  return c.html(index())
})

app.get('/:slug', async (c) => {
  const slug = c.req.param('slug')
  const result = await c.env.YAUS_DB.prepare("SELECT * FROM url WHERE slug = ?").bind(slug).first()
  if (!result) {
    throw new HTTPException(404)
  }

  const { original_url: url } = result as { original_url: string }
  return c.redirect(url, 302)
})

app.post(
  '/new',
  validator('form', (value, c) => {
    // validate value is a valid URL
    const { url: unvalidatedUrl } = value
    try {
      new URL(unvalidatedUrl.toString())
    }
    catch (error) {
      return c.html(index({ error: 'Invalid URL' }))
    }

    return value
  }),
  async (c) => {
    const body = c.req.valid('form')
    const { url } = body
    const slug = generateSlug()
    await c.env.YAUS_DB.prepare("INSERT INTO url (slug, original_url) VALUES (?, ?)").bind(slug, url.toString()).run()
    return c.html(index({ slug, fullyShortenUrl: `${c.env.HOST}/${slug}` }))
  }
)

app.notFound(async (c) => {
  return c.html(errorPage('Link not Found'))
})

app.onError(async (err, c) => {
  if (err instanceof HTTPException && err.status === 404) {
    return c.html(errorPage('Link not Found'))
  }
  console.error(err)
  return c.html(errorPage('Opps! Something went wrong'))
})

export default app


