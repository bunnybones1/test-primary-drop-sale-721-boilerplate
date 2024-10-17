import {
  Box,
  Card,
  Skeleton,
  Text,
  useMediaQuery,
} from "@0xsequence/design-system";
import CollectibleTileImage from "../CollectibleTileImage";
import { BuyWithCryptoCardButton } from "./BuyWithCryptoCardButton";
import { useEffect, useState } from "react";
import { ContractInfo, TokenMetadata } from "@0xsequence/indexer";
import { toast } from "react-toastify";
import { SendTransactionErrorType } from "viem";
import NftsMintedProgressBar from "../NftsMintedProgressBar";
import { NFT_TOKEN_CONTRACT_ABI } from "../../../utils/primarySales/abis/nftTokenContractAbi";
import { useReadContract } from "wagmi";
import PurchaseAnimation from "../blockchain/Connected/PurchaseAnimation";
import { formatPriceWithDecimals } from "../../../utils/primarySales/helpers";
import { UnpackedSaleConfigurationProps } from "../../../utils/primarySales/helpers";

interface CollectibleProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  collectibleBalance: { [key: string]: any } | undefined;
  tokenMetadata: TokenMetadata;
  chainId: number;
  currencyData: ContractInfo | undefined;
  totalMintedNftsPercentaje: number;
  totalSupply: string | 0;
  totalNftsMinted: string | undefined;
  userPaymentCurrencyBalance: bigint | undefined;
  price: bigint;
  currencyDecimals: number | undefined;
  saleConfiguration: UnpackedSaleConfigurationProps;
  refetchCollectionBalance: () => void;
  refetchTotalMinted: () => void;
}

function calculateMintedPercentage(minted: number, totalMax: number): number {
  if (totalMax <= 0) {
    return 0;
  }

  const percentage = (minted / totalMax) * 100;
  return Math.floor(percentage);
}

export const Collectible = ({
  collectibleBalance,
  tokenMetadata,
  chainId,
  currencyData,
  totalMintedNftsPercentaje,
  totalSupply,
  totalNftsMinted,
  userPaymentCurrencyBalance,
  price,
  currencyDecimals,
  saleConfiguration,
  refetchCollectionBalance,
  refetchTotalMinted,
}: CollectibleProps) => {
  const isMobile = useMediaQuery("isMobile");
  const [amount, setAmount] = useState(0);
  const [txExplorerUrl, setTxExplorerUrl] = useState("");
  const [txError, setTxError] = useState<SendTransactionErrorType | null>(null);
  const [purchasingNft, setPurchasingNft] = useState<boolean>(false);
  const logoURI = currencyData?.logoURI;
  const {
    data: nftsMinted,
    // isLoading: nftsMintedIsLoading,
    refetch: refetchNftsMinted,
  } = useReadContract({
    abi: NFT_TOKEN_CONTRACT_ABI,
    functionName: "tokenSupply",
    chainId: chainId,
    address: saleConfiguration.nftTokenAddress,
    args: [BigInt(tokenMetadata?.tokenId)],
  });

  const amountOwned: string = collectibleBalance?.balance || "0";
  const increaseAmount = () => {
    if (purchasingNft) return;
    setAmount(amount + 1);
  };

  const decreaseAmount = () => {
    if (amount === 0 || purchasingNft) return;
    setAmount(amount - 1);
  };

  const resetAmount = () => {
    setAmount(0);
  };

  const mintedNftPercentaje = calculateMintedPercentage(
    Number(nftsMinted),
    Number(totalSupply),
  );

  const formmatedPrice = currencyDecimals
    ? formatPriceWithDecimals(price, currencyDecimals)
    : 0;

  useEffect(() => {
    if (!txError || JSON.stringify(txError) === "{}") return;
    toast(`Error to purchase NFT`, { type: "error" });
    setPurchasingNft(false);
    console.error(txError);
  }, [txError]);

  return (
    <Box
      padding="1"
      width="full"
      flexDirection="column"
      style={{
        flexBasis: isMobile ? "100%" : "50%",
        width: "fit-content",
        maxWidth: "50rem",
      }}
    >
      <Card>
        <Box flexDirection="row" gap="6">
          <CollectibleTileImage imageUrl={tokenMetadata?.image || ""} />
          <Box display="flex" flexDirection="column" gap="6">
            <Text variant="large" fontWeight="bold" color="text100">
              {tokenMetadata?.name || ""}
            </Text>
            <Text
              variant="normal"
              fontWeight="bold"
              color="text100"
              style={{ textAlign: "left" }}
            >
              Token id: {tokenMetadata?.tokenId || ""}
            </Text>
            <NftsMintedProgressBar
              totalMintedNftsPercentaje={totalMintedNftsPercentaje}
              mintedNftsPercentaje={mintedNftPercentaje}
              tokenId={tokenMetadata?.tokenId || ""}
              mintedNftCount={Number(nftsMinted)}
              totalMintedNfts={Number(totalNftsMinted)}
              totalSupply={Number(totalSupply)}
            />
            <Box display="flex" justifyContent="space-between" gap="4">
              <Box flexDirection="row" gap="2">
                <Text
                  variant="normal"
                  fontWeight="bold"
                  color="text100"
                  style={{ textAlign: "left" }}
                >
                  Price: {formmatedPrice}
                </Text>
                {!logoURI ? (
                  <Skeleton style={{ width: 20, height: 20 }} />
                ) : (
                  // <TokenImage
                  //   // src="https://metadata.sequence.app/projects/30957/collections/690/image.png"
                  //   withNetwork="amoy"
                  //   symbol="matic"
                  //   style={{ width: 20, height: 20 }}
                  // />
                  <></>
                )}
              </Box>
              <Text
                variant="normal"
                fontWeight="bold"
                color="text100"
                style={{ textAlign: "left" }}
              >
                Amount Owned: {amountOwned}
              </Text>
            </Box>
            <Box
              display="flex"
              padding="4"
              borderRadius="lg"
              gap="4"
              style={{ backgroundColor: "rgba(32, 32, 32, 1)", width: "25rem" }}
            >
              <Box
                display="flex"
                alignItems="center"
                gap="8"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  width: "fit-content",
                  padding: "0.5rem 1rem",
                }}
                borderRadius="lg"
              >
                <Text
                  variant="large"
                  fontWeight="bold"
                  onClick={decreaseAmount}
                  style={{
                    cursor: "pointer",
                    color: "#ffffff",
                    fontWeight: 900,
                  }}
                >
                  -
                </Text>
                <Text
                  variant="large"
                  fontWeight="bold"
                  style={{ color: "#ffffff" }}
                >
                  {amount}
                </Text>
                <Text
                  variant="large"
                  fontWeight="bold"
                  onClick={increaseAmount}
                  style={{
                    cursor: "pointer",
                    color: "#ffffff",
                    fontWeight: 900,
                  }}
                >
                  +
                </Text>
              </Box>
              <BuyWithCryptoCardButton
                amount={amount}
                chainId={chainId}
                collectionAddress={saleConfiguration.nftTokenAddress}
                tokenId={tokenMetadata.tokenId}
                resetAmount={resetAmount}
                setTxExplorerUrl={setTxExplorerUrl}
                setTxError={setTxError}
                setPurchasingNft={setPurchasingNft}
                userPaymentCurrencyBalance={userPaymentCurrencyBalance}
                price={price}
                currencyData={currencyData}
                refetchCollectionBalance={refetchCollectionBalance}
                refetchTotalMinted={refetchTotalMinted}
                refetchNftsMinted={refetchNftsMinted}
              />
            </Box>
            {purchasingNft && (
              <PurchaseAnimation
                amount={amount}
                image={tokenMetadata.image || ""}
                name={tokenMetadata.name}
              />
            )}
            {txError && JSON.stringify(txError) != "{}" && (
              <span>Error to purchase NFT. Details in console</span>
            )}
            {txExplorerUrl && (
              <Box display="flex" flexDirection="column" marginBottom="3">
                <Text variant="large" color="text100">
                  Purchase Completed Succesfully
                </Text>
                <a
                  href={txExplorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>View transaction in explorer</span>
                  <br />
                </a>
              </Box>
            )}
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
