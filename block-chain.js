// blockChain function
function blockChain(data, prev = { index: 0, hash: '0' }) {
  const index = prev.index + 1
  const blockData = data
  const hash = hashCode(index + prev.hash + JSON.stringify(blockData))

  const block = {
    index,
    hash,
    data: blockData,
    prev,
    chain(nextData) {
      return blockChain(nextData, block)
    }
  };

  return block
}
