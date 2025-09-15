// clones
const clone1 = JSON.parse(JSON.stringify(person))


const clone2 = structuredClone(person)

// copy by reference
let samePerson = person


person.age++

person.country = 'FR'

