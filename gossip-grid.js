import { gossips } from './gossip-grid.data.js';

"use strict";

export const grid = () => {
    const body = document.querySelector('body')
    const rangesDiv = document.createElement('div')
    const widthInput = document.createElement('input')
    const fontSizeInput = document.createElement('input')
    const backgroundInput = document.createElement('input')
    widthInput.type = "range"
    fontSizeInput.type = "range"
    backgroundInput.type = "range"
    widthInput.id = "width"
    fontSizeInput.id = "fontSize"
    backgroundInput.id = "background"
    widthInput.setAttribute('min', "200")
    widthInput.setAttribute('max', "800")
    fontSizeInput.setAttribute('min', "20")
    fontSizeInput.setAttribute('max', "40")
    backgroundInput.setAttribute('min', "20")
    backgroundInput.setAttribute('max', "75")
    
    rangesDiv.classList.add('ranges')
    widthInput.classList.add("range")
    fontSizeInput.classList.add("range")
    backgroundInput.classList.add("range")
    rangesDiv.append(widthInput)
    rangesDiv.append(fontSizeInput)
    rangesDiv.append(backgroundInput)
    body.append(rangesDiv)

    const gossipForm = document.createElement('form')
    gossipForm.classList.add("gossip")
    const gossipText = document.createElement('textarea')
    gossipText.placeholder = "Got a gossip to share?"
    const gossipSubmit = document.createElement('button')
    gossipSubmit.textContent = "Share gossip!"
    gossipSubmit.type = "submit"
    gossipForm.append(gossipText)
    gossipForm.append(gossipSubmit)
    body.append(gossipForm)

    gossips.map(gossip => {
        const gossipDiv = document.createElement('div')
        gossipDiv.classList.add("gossip")
        gossipDiv.textContent = gossip
        body.append(gossipDiv)
    })

    gossipSubmit.addEventListener('click', function(e) {
        e.preventDefault()
        if (!gossipText.value) return
        const gossipDiv = document.createElement('div')
        gossipDiv.classList.add("gossip")
        gossipDiv.classList.add('fade-in')
        gossipDiv.textContent = gossipText.value
        gossipDiv.style.width = gossipForm.style.width
        gossipDiv.style.background = gossipForm.style.background
        gossipDiv.style.fontSize = gossipForm.style.fontSize
        gossipText.value = ""
        gossipForm.insertAdjacentElement('afterend', gossipDiv)
    })

    widthInput.addEventListener('input', function() {
        const gossipCards = document.getElementsByClassName('gossip')
        for (const card of gossipCards) {
            card.style.width = widthInput.value + "px"
        }
    })

    fontSizeInput.addEventListener('input', function() {
        const gossipCards = document.getElementsByClassName('gossip')
        for (const card of gossipCards) {
            card.style.fontSize = fontSizeInput.value + "px"
        }
    })

    backgroundInput.addEventListener('input', function() {
        const gossipCards = document.getElementsByClassName('gossip')
        for (const card of gossipCards) {
            card.style.background = `hsl(280, 50%, ${backgroundInput.value}%)`
        }
    })
}