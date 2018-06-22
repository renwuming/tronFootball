export default async function (pList, myScore, enemyScore) {
  let list = [],
    roundListMe = new Array(myScore).fill(0),
    roundList = new Array(enemyScore).fill(0)
  list = list.concat(roundListMe.map(_ => {
    return createWinRound()
  }))
  list = list.concat(roundList.map(_ => {
    return createLoseRound()
  }))
  list.sort((a,b) => Math.random()-.5)

  for(let i=0;i<list.length;i++) {
    await handleRound(list[i])
  }
}

function createWinRound() {
  return [0,2,5,6,1]
}
function createLoseRound() {
  return [0,1,5,8,2,6]
}

async function handleRound(list) {
  
  
}

async function add(that, str) {
  const list = str.split('')
  for (let i = 0; i < list.length; i++) {
    that.liveStr += list[i]
    await sleep(100)
  }
}

function sleep(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}
