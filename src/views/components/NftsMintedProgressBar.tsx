import { Box, Text } from "@0xsequence/design-system";

interface NftsMintedProgressBarProps {
  mintedNftsPercentaje: number;
  mintedNftCount: number;
  tokenId: string | number;
  totalMintedNftsPercentaje: number;
  totalMintedNfts: number;
  totalSupply: number;
}

const mintedNftCountProgressColor = "rgb(0, 123, 255)";
const totalMintedNftsProgressColor = "#B8B8B8";

const NftsMintedProgressBar = ({
  mintedNftsPercentaje,
  totalMintedNftsPercentaje,
  tokenId,
  mintedNftCount,
  totalMintedNfts,
  totalSupply,
}: NftsMintedProgressBarProps) => {
  const otherNftsMintedValue = totalMintedNfts - mintedNftCount;
  return (
    <Box display="flex" flexDirection="column">
      <Text variant="normal" fontWeight="bold">
        NFTs minted details:
      </Text>
      <Box marginBottom="4">
        <Text
          variant="normal"
          fontWeight="bold"
          style={{ color: mintedNftCountProgressColor }}
        >
          {`NFT #${tokenId} (${mintedNftCount})`}
        </Text>
        <Text variant="normal" fontWeight="bold">
          {` | `}
        </Text>
        <Text
          variant="normal"
          fontWeight="bold"
          style={{ color: totalMintedNftsProgressColor }}
        >
          {`Other NFTs (${otherNftsMintedValue})`}
        </Text>
        <Text variant="normal" fontWeight="bold">
          {` | `}
        </Text>
        <Text variant="normal" fontWeight="bold">
          {`Limit supply (${totalSupply})`}
        </Text>
      </Box>
      <Box
        borderRadius="lg"
        overflow="hidden"
        height="5"
        position="relative"
        style={{ width: "25rem", backgroundColor: "#e0e0e0", border: "none" }}
      >
        <Box
          position="absolute"
          left="0"
          height="full"
          borderRightRadius="lg"
          style={{
            width: `${totalMintedNftsPercentaje}%`,
            backgroundColor: totalMintedNftsProgressColor,
            transition: "width 0.5s ease-in-out",
          }}
        ></Box>
        <Box
          position="absolute"
          height="full"
          borderRightRadius="lg"
          left="0"
          style={{
            width: `${mintedNftsPercentaje}%`,
            backgroundColor: mintedNftCountProgressColor,
            transition: "width 0.5s ease-in-out",
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default NftsMintedProgressBar;
