import { addresses } from "utils/vars";
import diamondAbi from "abi/diamondABI.json";

type DiamondCallMethods = {name: "getAavegotchiSvg", parameters: [string]}

export const useDiamondCall = async <R extends unknown>(
  web3: any,
  method: DiamondCallMethods,
): Promise<R> => {
  const address = addresses.diamond;
  const contract = new web3.eth.Contract(diamondAbi, address);
  try {
    const { name, parameters } = method;
    const res = await contract.methods[name](...parameters).call();
    return res;
  } catch (err) {
    throw { status: 400, name: "Diamond contract error", message: err.message, stack: err.stack };
  }
};
