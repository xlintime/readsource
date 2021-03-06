function positionNode(node, previousNode, indent, dropCap) {
  //  caculate the node's horizontal offset DX, dx's type might be number or function
  const displacementX = typeof indent === 'function' ? indent(node) : indent * node.depth;

  if (!dropCap) {
    try {
      if (node.id === node.parent.children[0].id) {
        node.x += displacementX;
        node.y = previousNode ? previousNode.y : 0;
        return;
      }
    } catch (e) {
      // skip to normal when a node has no parent
    }
  }

  node.x += displacementX;
  node.y = previousNode ? previousNode.y + previousNode.height : 0;
  return;
}
module.exports = (root, indent, dropCap) => {
  let previousNode = null;
  root.eachNode(node => {
    positionNode(node, previousNode, indent, dropCap);
    previousNode = node;
  });
};
