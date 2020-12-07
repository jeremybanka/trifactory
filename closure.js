let current = 12

function addStuff(toAdd) {
  let current = 0
  return () => {
    current += toAdd
    return current
  }
}

console.log(current)
console.log('-----------')

const f1 = addStuff(10)
const f2 = addStuff(20)

console.log(f1())
console.log(f1())
console.log(f1())
console.log(f1())
console.log('-----------')
console.log(f2())
console.log(f2())
console.log(f2())
console.log(f2())
