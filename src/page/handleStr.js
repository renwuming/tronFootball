export default async function (pList, myScore, enemyScore) {
  let list = [],
    roundListMe = new Array(myScore),
    roundList = new Array(enemyScore)
  list = list.concat(roundListMe.map(_ => {
    return createWinRound(pList)
  }))
  list = list.concat(roundList.map(_ => {
    return createLoseRound(pList)
  }))
  // await add(this, '球员A带球过人')
  // await sleep(1000)
  // await add(this, '\n球员B带球过人')
  // await sleep(1000)
  // await add(this, '\n球员A带球过人')
  // await sleep(1000)
  // await add(this, '\n球员B带球过人')
  // await sleep(1000)
  // await add(this, '\n球员A带球过人')
  // await sleep(1000)
  // await add(this, '\n球员B带球过人')
  // await sleep(1000)
  // await add(this, '\n球员A带球过人')
  // await sleep(1000)
  // await add(this, '\n球员B带球过人')
  // await sleep(1000)
  // await add(this, '\n球员A带球过人')
  // await sleep(1000)
  // await add(this, '\n球员B带球过人')
  // await sleep(1000)
}

function createWinRound(pList) {
  
}

function createLoseRound(pList) {
  
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