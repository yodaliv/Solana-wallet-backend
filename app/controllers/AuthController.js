const crypto = require('crypto');
const nacl = require('tweetnacl');
const getNFT = require("@nfteyez/sol-rayz");
const base58 = require('bs58');

const config = require("../config/config.js");

exports.getRandomMessage = (req, res) => {
  const randomMessage = new TextEncoder().encode(crypto.randomBytes(8).toString('hex'));
  res.send({data: randomMessage});
}

exports.Verify = (req, res) => {
  const publicKey = base58.decode(req.body.publicKey);
  // is received from the client signature and publicKey
  const rdMsg = Object.keys(req.body.randomMessage).map(key => req.body.randomMessage[key]);
  if (nacl.sign.detached.verify(Uint8Array.from(rdMsg), Uint8Array.from(req.body.signature.data), publicKey))
  {
    (async () => {
      const nfts = await getNFT.getParsedNftAccountsByOwner({
        publicAddress: publicKey,
        serialization: true,
      });
      
      if (nfts.length) {
          nfts.map((nftData) => {
              if (nftData.updateAuthority === config.CREATOR_WALLET_ADDRESS) {
                res.send({result: true, message:'Verify sucess'});
              } else{
                res.send({result: false, message:'Sorry. Access denied, you do not have the required NFT.'});
              }
          })
      }
    })();
  }
  else
  {
    res.send({result: 'Sorry. Access denied, you do not have the required NFT.'});
  }
}
