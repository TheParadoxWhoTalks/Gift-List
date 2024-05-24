const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const DaTree = new MerkleTree(niceList);

  // The root
  const root = DaTree.getRoot();
  console.log(root);
  // Getting the proof
  function proving(DaName)
  {
    const index = niceList.findIndex(n => n === DaName);
    const DaProof = DaTree.getProof(index);
    return DaProof;
  }

  // Getting the name
  if (process.argv.length <= 2)
  {
    console.log("Please type your name as an argument");
    return 1;
  }
  const name = process.argv.slice(2).join(' ');
  const proof = proving(name);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name : name,
    proof : proof
  });

  console.log({ gift });
}

main();