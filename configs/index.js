const CHANNEL = "wsr202";
const CHAINCODE = "test1";
const CONTRACTS = {
  USERS: "UsersContract",
  SHOPS: "ShopContract",
  REQUESTS: "RequestsContract",
};
const PORT = 5000;
const TRANSACTIONS = {
  USERS: {
    INIT: "initContract",
    GET_USER: "getUser",
    GET_USERS: "getUsers",
    REG: "registration",
  },
  SHOPS: {
    INIT: "initContract",
    GET_SHOP: "getShop",
    GET_SHOPS: "getShops",
    SET_SHOP: "setShop",
    SET_WORKER: "setWorker",
    SET_RATE: "setRate",
    SET_LIKE: "setLike",
    LIKE_RATE: "likeRate",
    SET_COMMENT: "setComment",
    LIKE_COMMENT: "likeComment",
  },
  REQUESTS: {
    INIT: "initContract",
    GET_REQUEST: "getRequest",
    GET_REQUESTS: "getRequests",
    SET_REQUEST: "setRequest",
    ANSWER_REQUEST: "answerRequest",
    SET_ADMIN: "setAdmin",
  },
};

const ORGS = { Users: "org1", Shops: "org2", Bank: "org3" };

module.exports = {
  CHANNEL,
  CHAINCODE,
  CONTRACTS,
  PORT,
  TRANSACTIONS,
  ORGS,
};
