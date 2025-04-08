import { Web3 } from 'web3';
import { abi, address as contractAddress } from '../abis/Mytoken.json'; // Todo: 배포먼저 실행해주세요. (npm run deploy)
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const web3 = new Web3('HTTP://127.0.0.1:7545'); // Ganache를 사용합니다.
const privateKey = process.env.PRIVATE_KEY || '';

export const getChainId = async () => {
  return web3.eth.net.getId();
};

export const getWeb3 = async () => {
  return web3;
};

export const getOwner = async () => {
  // Contract의 Owner를 리턴합니다.
  return web3.eth.accounts.privateKeyToAccount(privateKey);
};
/*
    위의 코드들은 지우지 않습니다.
    
    abi : Mytoken Contract의 ABI 데이터
    contractAddress : Mytoken Contract의 Address
    privateKey : .env 파일에 설정된 가나슈 계정의 프라이빗 키
*/

export const getContract = () => {
  // Todo: MyToken Contract 인스턴스를 리턴합니다. - new web3.eth.Contract(ABI, 컨트랙트 주소);
  // 이 후에 구현하는 컨트랙트 호출은 구현한 getContract를 사용합니다.
  const MyToken = new web3.eth.Contract(abi, contractAddress);
  return MyToken;
};

export const totalSupply = async () => {
  // Todo: MyToken의 totalSupply 리턴 값을 리턴합니다.
  return getContract().methods.totalSupply().call();
};

export const balanceOf = async (address: string) => {
  // Todo: 인자 address의 balanceOf 리턴 값을 리턴합니다.
  return getContract().methods.balanceOf(address).call();
};


export const transfer = async (from: string, to: string, amount: number) => {
  return getContract().methods
    .transfer(to, amount)
    .send({ from });


};

export const approve = async (spender: string, amount: number) => {
  const owner = await getOwner(); // getOwner는 { address: string } 같은 형태를 반환한다고 가정

  return await getContract().methods
    .approve(spender, amount)
    .send({ from: owner.address });
};


export const allowance = async (owner: string, spender: string) => {
  //Todo: allowance함수는 컨트랙트의 allowance 함수를 사용하여 owner가 spender에게 부여한 토큰의 양을 리턴해야 합니다.

  return getContract().methods.allowance(owner, spender).call();
};

export const transferFrom = async (
  spender: string,
  from: string,
  to: string,
  amount: number
) => {
  //Todo: transferFrom함수는 컨트랙트의 transferFrom 함수를 사용하여 승인을 받은 spender가 승인한 from 주소에서 to 주소로 amount(wei 단위)만큼 토큰을 전송해야 하며, 그을 리턴해야 합니다.

  return getContract().methods.transferFrom(from, to, amount).send({ from: spender })
};
