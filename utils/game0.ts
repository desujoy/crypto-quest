export type Question = {
  question: string;
  options: string[];
};

export const questions: Question[] = [
  {
    question: "What is a blockchain?",
    options: [
      "A type of database that stores data in a centralized manner",
      "A distributed ledger technology for storing transactions",
      "A programming language",
      "A type of cryptocurrency",
    ],
  },
  {
    question: "Which consensus algorithm does Bitcoin use?",
    options: [
      "Proof of Stake (PoS)",
      "Proof of Work (PoW)",
      "Delegated Proof of Stake (DPoS)",
      "Byzantine Fault Tolerance (BFT)",
    ],
  },
  {
    question: "What is the main purpose of a smart contract?",
    options: [
      "To manually manage transactions on the blockchain",
      "To automate and execute agreements based on predefined conditions",
      "To mine new cryptocurrency tokens",
      "To encrypt data on the blockchain",
    ],
  },
  {
    question:
      "Which blockchain platform is known for its smart contract functionality?",
    options: ["Bitcoin", "Ethereum", "Ripple", "Litecoin"],
  },
  {
    question: "What is a block in a blockchain?",
    options: [
      "A collection of transactions that are added to the blockchain",
      "A method of mining cryptocurrency",
      "A type of node",
      "A cryptographic function",
    ],
  },
  {
    question: "What is gas in the context of Ethereum?",
    options: [
      "The fuel used to run Ethereum nodes",
      "The transaction fee for executing operations on the Ethereum network",
      "A new token on Ethereum",
      "A physical fuel for mining equipment",
    ],
  },
  {
    question: "What is meant by a 'fork' in blockchain?",
    options: [
      "A splitting of a blockchain into two separate chains",
      "A method to verify blocks",
      "A tool for hashing data",
      "A function for encrypting transactions",
    ],
  },
  {
    question: "Which of the following best describes a hash function?",
    options: [
      "A reversible function for data encryption",
      "A function that maps data of arbitrary size to fixed-size values",
      "A function to retrieve data from the blockchain",
      "A method to create cryptocurrency",
    ],
  },
  {
    question: "What does 'decentralization' mean in blockchain?",
    options: [
      "Data is stored in a single, central location",
      "No central authority or single point of control",
      "Transactions are encrypted",
      "All transactions require manual verification",
    ],
  },
  {
    question: "Which blockchain is specifically designed for enterprise use?",
    options: ["Hyperledger", "Dogecoin", "Bitcoin", "Cardano"],
  },
  {
    question: "What is the role of miners in a Proof of Work system?",
    options: [
      "To validate and record transactions by solving complex puzzles",
      "To create new tokens by holding coins",
      "To act as nodes that only store data",
      "To generate smart contracts",
    ],
  },
  {
    question: "What is Solidity?",
    options: [
      "A consensus algorithm",
      "A programming language used for developing smart contracts",
      "A type of token",
      "A blockchain platform",
    ],
  },
  {
    question: "What does the term 'block time' refer to?",
    options: [
      "The time it takes for a node to connect",
      "The time required for a new block to be mined",
      "The period between network updates",
      "The time to synchronize wallets",
    ],
  },
  {
    question: "Which of these is a layer 2 scaling solution for blockchains?",
    options: [
      "Ethereum 2.0",
      "Lightning Network",
      "Consensus algorithm",
      "Smart contract",
    ],
  },
  {
    question: "What is a dApp?",
    options: [
      "A centralized application",
      "A decentralized application",
      "A type of consensus algorithm",
      "A type of cryptocurrency",
    ],
  },
  {
    question: "Which of the following is true about private blockchains?",
    options: [
      "They are accessible to everyone without restrictions",
      "They have controlled access and permissioned entry",
      "They are synonymous with public blockchains",
      "They do not use cryptography",
    ],
  },
  {
    question: "What is 'sharding' in the context of blockchain?",
    options: [
      "A method of dividing a database into smaller pieces",
      "A process of encrypting data",
      "A mechanism for creating tokens",
      "A consensus algorithm",
    ],
  },
  {
    question: "What is the purpose of a Merkle Tree in blockchain?",
    options: [
      "To mine blocks efficiently",
      "To enable faster synchronization of blocks",
      "To securely verify the integrity of data",
      "To encrypt transactions",
    ],
  },
  {
    question: "What problem does the Byzantine Generals Problem relate to?",
    options: [
      "Scaling blockchains",
      "Achieving consensus in a distributed system with unreliable actors",
      "Reducing transaction fees",
      "Mining efficiency",
    ],
  },
  {
    question: "What does 'immutability' mean in blockchain?",
    options: [
      "Data can be modified at any time",
      "Once data is recorded, it cannot be altered",
      "Data is only stored temporarily",
      "Data must be encrypted",
    ],
  },
];

export const answers: string[] = [
  "A distributed ledger technology for storing transactions",
  "Proof of Work (PoW)",
  "To automate and execute agreements based on predefined conditions",
  "Ethereum",
  "A collection of transactions that are added to the blockchain",
  "The transaction fee for executing operations on the Ethereum network",
  "A splitting of a blockchain into two separate chains",
  "A function that maps data of arbitrary size to fixed-size values",
  "No central authority or single point of control",
  "Hyperledger",
  "To validate and record transactions by solving complex puzzles",
  "A programming language used for developing smart contracts",
  "The time required for a new block to be mined",
  "Lightning Network",
  "A decentralized application",
  "They have controlled access and permissioned entry",
  "A method of dividing a database into smaller pieces",
  "To securely verify the integrity of data",
  "Achieving consensus in a distributed system with unreliable actors",
  "Once data is recorded, it cannot be altered",
];

export const getQuestions = async () => {
  const _questions = questions.map((question) => {
    return {
      question: question.question,
      options: question.options.sort(() => Math.random() - 0.5),
    };
  });
  return _questions.sort(() => Math.random() - 0.5);
};

export const evaluateAnswers = async (_answers: string[]) => {
  let score = 0;
  _answers.forEach((answer, index) => {
    if (answer === answers[index]) {
      score++;
    }
  });
  return Math.floor((score / questions.length) * 100);
};
