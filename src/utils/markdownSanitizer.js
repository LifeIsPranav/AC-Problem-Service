const marked = require('marked')
const sanitizeHtml = require('sanitize-html')
const TurndownService = require('turndown')


function sanitizeMarkdown(markdownContent) {

  // 1. MarkDown -> HTML
  const convertedHtml = marked.parse(markdownContent)
  
  // 2. Sanitize HTML
  const sanitizedHtml = sanitizeHtml(convertedHtml, {
    allowedTags: sanitizeHtml.defaults.allowedTags
  })

  // 3. HTML -> Markdown
  const turndownService = new TurndownService()
  const sanitizedMarkdown = turndownService.turndown(sanitizedHtml)
  return sanitizedMarkdown

}

module.exports = sanitizeMarkdown