import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import * as dotenv from 'dotenv';
dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.28',
  networks: {
    ganache: {
      url: 'HTTP://127.0.0.1:7545', // Todo: Ganache RPC URL
      accounts: [
        process.env.PRIVATE_KEY || '0x97ecbce67a9a2624e52f99de30a6959ba6a043f5dab4d58926eb0599f7ff5737', // Todo: Ganache에서 제공하는 프라이빗 키 사용(.env 파일을 사용합니다)
      ],
    },
  },
};

export default config;
