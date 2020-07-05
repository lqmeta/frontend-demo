/**
 * 
 * @param {*} promise 
 * @returns [data, err]
 */
const awaitWrap = (promise) => {
  return promise
    .then(data => [data, null])
    .catch(err => [null, err]);
}

module.exports = {
  awaitWrap,
}
