import { Image } from "@0xsequence/design-system";

interface CollectibleTileImageProps {
  imageUrl?: string;
}

const CollectibleTileImage = ({ imageUrl }: CollectibleTileImageProps) => {
  return (
    <Image
      style={{
        width: "298px",
        height: "298px",
        objectFit: "cover",
        objectPosition: "center",
      }}
      src={imageUrl}
    />
  );
};

export default CollectibleTileImage;
