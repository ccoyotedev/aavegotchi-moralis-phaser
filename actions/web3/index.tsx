import { addresses } from "utils/vars";
import diamondAbi from "abi/diamondABI.json";
import { Tuple } from "types";

type DiamondCallMethods =
  | { name: "getAavegotchiSvg"; parameters: [string] }
  | {
      name: "previewAavegotchi";
      parameters: [string, string, Tuple<number, 6>, Tuple<number, 16>];
    };

export const useDiamondCall = async <R extends unknown>(
  web3: any,
  method: DiamondCallMethods
): Promise<R> => {
  const address = addresses.diamond;
  const contract = new web3.eth.Contract(diamondAbi, address);
  try {
    const { name, parameters } = method;
    const res = await contract.methods[name](...parameters).call();
    return res;
  } catch (err) {
    throw {
      status: 400,
      name: "Diamond contract error",
      message: err.message,
      stack: err.stack,
    };
  }
};
