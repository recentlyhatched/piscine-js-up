import { gossips } from './gossip-grid.data.js'

export const grid = () => {
  // --- RANGES AT TOP ---
  const rangesDiv = document.createElement('div')
  rangesDiv.className = 'ranges'

  // Width slider (container width)
  const widthRange = document.createElement('input')
  widthRange.type = 'range'
  widthRange.id = 'width'
  widthRange.className = 'range'
  widthRange.min = 200
  widthRange.max = 800
  widthRange.value = 600
  rangesDiv.appendChild(widthRange)

  // Text size slider (font size of gossips)
  const textSizeRange = document.createElement('input')
  textSizeRange.type = 'range'
  textSizeRange.id = 'fontSize'
  textSizeRange.className = 'range'
  textSizeRange.min = 20
  textSizeRange.max = 40
  textSizeRange.value = 20
  rangesDiv.appendChild(textSizeRange)

  // Background slider (lightness of gossips)
  const backgroundRange = document.createElement('input')
  backgroundRange.type = 'range'
  backgroundRange.id = 'background'
  backgroundRange.className = 'range'
  backgroundRange.min = 20
  backgroundRange.max = 75
  backgroundRange.value = 75
  rangesDiv.appendChild(backgroundRange)

  document.body.appendChild(rangesDiv)

  // --- GOSSIP CONTAINER ---
  const container = document.createElement('div')
  container.className = 'gossip-grid'
  document.body.appendChild(container)

  // --- FORM CARD ---
  const formCard = document.createElement('div')
  formCard.className = 'gossip'

  const form = document.createElement('form')

  const textarea = document.createElement('textarea')
  textarea.placeholder = 'Share your gossip...'
  form.appendChild(textarea)

  const button = document.createElement('button')
  button.type = 'submit'
  button.textContent = 'Share gossip!'
  form.appendChild(button)

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (textarea.value.trim() === '') return
    addGossip(textarea.value.trim())
    textarea.value = ''
  })

  formCard.appendChild(form)
  container.appendChild(formCard)

  // --- FUNCTION TO ADD GOSSIP ---
  const addGossip = (text) => {
    const gossipCard = document.createElement('div')
    gossipCard.className = 'gossip'
    gossipCard.textContent = text
    container.appendChild(gossipCard)
    applyStyles()
  }

  // Add initial gossips
  gossips.forEach(addGossip)

  // --- APPLY STYLES ---
  const applyStyles = () => {
    // container width
    container.style.width = `${widthRange.value}px`
    container.style.margin = '0 auto' // keep centered

    // update gossip cards
    const cards = container.querySelectorAll('.gossip')
    cards.forEach((card, index) => {
      if (index === 0) return // skip form card
      card.style.fontSize = `${textSizeRange.value}px`
      card.style.background = `hsl(280, 50%, ${backgroundRange.value}%)`
    })
  }

  // Event listeners for sliders
  widthRange.addEventListener('input', applyStyles)
  textSizeRange.addEventListener('input', applyStyles)
  backgroundRange.addEventListener('input', applyStyles)

  // Initial apply
  applyStyles()
}
