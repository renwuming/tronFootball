export default async function(result) {
  await add(this, 'renwuming')
}

async function add(that, str) {
  const list = str.split('')
  for(let i=0;i<list.length;i++) {
    that.liveStr += list[i]
    await sleep(100)
  }
}

function sleep(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}