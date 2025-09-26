import { gossips } from './gossip-grid.data.js'

export const grid = () => {
  // 1. Create ranges container and sliders + labels
  const rangesDiv = document.createElement('div')
  rangesDiv.className = 'ranges'
  document.body.appendChild(rangesDiv)

  function makeLabeledRange({ id, min, max, initial, unit, labelText }) {
    const wrapper = document.createElement('div')
    wrapper.className = 'range-wrapper'

    const label = document.createElement('label')
    label.htmlFor = id
    label.textContent = `${labelText}: `

    const spanVal = document.createElement('span')
    spanVal.className = 'range-value'
    spanVal.textContent = `${initial}${unit}`
    label.appendChild(spanVal)

    const input = document.createElement('input')
    input.type = 'range'
    input.id = id
    input.className = 'range'
    input.min = min
    input.max = max
    input.value = initial

    input.addEventListener('input', () => {
      spanVal.textContent = `${input.value}${unit}`
      applyStyles()
    })

    wrapper.appendChild(label)
    wrapper.appendChild(input)
    return { wrapper, input }
  }

  const widthCtrl = makeLabeledRange({ id: 'width', min: 200, max: 800, initial: 600, unit: 'px', labelText: 'Width' })
  const fontSizeCtrl = makeLabeledRange({ id: 'fontSize', min: 20, max: 40, initial: 20, unit: 'px', labelText: 'Text size' })
  const bgCtrl = makeLabeledRange({ id: 'background', min: 20, max: 75, initial: 75, unit: '%', labelText: 'Background' })

  rangesDiv.append(widthCtrl.wrapper, fontSizeCtrl.wrapper, bgCtrl.wrapper)

  // 2. Gossip container
  const container = document.createElement('div')
  container.className = 'gossip-grid'
  document.body.appendChild(container)

  // 3. Form card at first position
  const formCard = document.createElement('div')
  formCard.className = 'gossip'
  const form = document.createElement('form')
  const textarea = document.createElement('textarea')
  const button = document.createElement('button')
  button.type = 'submit'
  button.textContent = 'Share gossip!'

  form.append(textarea, button)
  formCard.appendChild(form)
  container.appendChild(formCard)

  form.addEventListener('submit', event => {
    event.preventDefault()
    const text = textarea.value.trim()
    if (!text) return
    // insert new gossip **after** the form
    const newCard = createGossipCard(text)
    container.insertBefore(newCard, container.children[1])
    textarea.value = ''
    applyStyles()
  })

  // 4. Create all initial gossip cards
  gossips.forEach(g => {
    const card = createGossipCard(g)
    container.appendChild(card)
  })

  // helper
  function createGossipCard(text) {
    const card = document.createElement('div')
    card.className = 'gossip'
    card.textContent = text
    return card
  }

  // 5. applyStyles function
  function applyStyles() {
    container.style.width = `${widthCtrl.input.value}px`
    container.style.margin = '0 auto'

    const cards = container.querySelectorAll('.gossip')
    cards.forEach((card, index) => {
      if (index === 0) {
        // styling for form card maybe slightly different
        card.style.background = ''  // or default
        return
      }
      card.style.fontSize = `${fontSizeCtrl.input.value}px`
      card.style.background = `hsl(280, 50%, ${bgCtrl.input.value}%)`
    })
  }

  // initialize
  applyStyles()
}
