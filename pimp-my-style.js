import { styles } from './pimp-my-style.data.js'

let index = 0
let adding = true

export const pimp = () => {
  const btn = document.querySelector('button')

  if (adding) {
    btn.classList.add(styles[index])
    index++

    if (index === styles.length) {
      adding = false
      btn.classList.add('unpimp')
    }
  } else {
    index--
    btn.classList.remove(styles[index])

    if (index === 0) {
      adding = true
      btn.classList.remove('unpimp')
    }
  }
}
