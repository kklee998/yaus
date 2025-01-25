import { html } from 'hono/html'

const indexPage = async ({ slug = '', fullyShortenUrl = '', error = '' } = {}) => {

    const resultBody = html`
      <div class="result">
        <p>Shortened URL: <a class="short-url" href=${slug}>${fullyShortenUrl}</a></p>
      </div>
    `
  
    const errorBody = html`
        <div class="error">
          <p>Error: ${error}</p>
        </div>
    `
  
    return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>YAUS (Yet Another URL Shortner)</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  margin: 0;
                  padding: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  background-color: #f4f4f4;
              }
              .container {
                  background-color: white;
                  padding: 2rem;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  width: 100%;
                  max-width: 500px;
              }
              .error {
                  margin-top: 1rem;
                  padding: 1rem;
                  background-color: #f8d7da;
                  color: #721c24;
                  border: 1px solid #f5c6cb;
                  border-radius: 4px;
              }
              h1 {
                  text-align: center;
                  color: #333;
              }
              form {
                  display: flex;
                  flex-direction: column;
              }
              input[id="url"] {
                  padding: 0.5rem;
                  margin-bottom: 1rem;
                  border: 1px solid #ddd;
                  border-radius: 4px;
              }
              button {
                  padding: 0.5rem;
                  background-color: #007bff;
                  color: white;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                  transition: background-color 0.3s ease;
              }
              button:hover {
                  background-color: #0056b3;
              }
              .result {
                  margin-top: 1rem;
                  padding: 1rem;
                  background-color: #e9ecef;
                  border-radius: 4px;
              }
              .short-url {
                  font-weight: bold;
                  color: #007bff;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Yet Another URL Shortner</h1>
              <form action="/new" method="post">
                  <input type="url" id="url" name="url" placeholder="Enter your long URL here" required>
                  <button type="submit">Shorten URL</button>
              </form>
              ${fullyShortenUrl ? resultBody : ''}
              ${error ? errorBody : ''}
          </div>
      </body>
    </html>
  `
  }
  
  const errorPage = async (errorMessage: string) => {
    return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>YAUS (Yet Another URL Shortner)</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  margin: 0;
                  padding: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  background-color: #f4f4f4;
              }
              .container {
                  background-color: white;
                  padding: 2rem;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  width: 100%;
                  max-width: 500px;
              }
              .error {
                  margin-top: 1rem;
                  padding: 1rem;
                  background-color: #f8d7da;
                  color: #721c24;
                  border: 1px solid #f5c6cb;
                  border-radius: 4px;
              }
              h1 {
                  text-align: center;
                  color: #333;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>${errorMessage}</h1>
          </div>
      </body>
    </html>
  `
  
  }


export { indexPage as index, errorPage }