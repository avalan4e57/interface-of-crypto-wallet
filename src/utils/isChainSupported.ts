import { SupportedChains } from "@/enums";

export function isChainSupported(chainId: number) {
  return SupportedChains[chainId] && chainId !== SupportedChains.NOT_SUPPORTED;
}
