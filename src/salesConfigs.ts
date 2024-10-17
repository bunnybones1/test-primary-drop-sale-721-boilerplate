type SaleConfiguration = {
  nftTokenAddress: `0x${string}`;
  salesContractAddress: `0x${string}`;
  chainId: number;
  itemsForSale: string[];
};

export const salesConfigs: SaleConfiguration[] = [
  {
    nftTokenAddress: "0x888a322db4b8033bac3ff84412738c096f87f9d0",
    salesContractAddress: "0x0327b2f274e04d292e74a06809bcd687c63a4ba4",
    chainId: 80002, //polygonAmoy
    // Modify here to show different items
    itemsForSale: ["0", "1"],
  },
  {
    nftTokenAddress: "0xd4bb59d0ba1f7b2beea4c6d9b9f151ee1da02665",
    salesContractAddress: "0x326d2fbe4808dd2a3e205aecc5e25a6322ad0a81",
    chainId: 421614, //arbitrumSepolia,
    // Modify here to show different items
    itemsForSale: ["0"],
  },
];

// This value must match one of the chainIds present in your salesConfigurations.
export const defaultChainId = 80002; //polygonAmoy
