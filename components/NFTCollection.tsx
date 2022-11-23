import {
  Box,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { getAllNFTs, NFTDataType } from "utils/firebaseUtils";

export default function NFTCollection() {
  const [data, setData] = useState<NFTDataType[]>([]);

  useMemo(() => {
    getAllNFTs().then((collection) => {
      if (collection.empty) return;

      collection.forEach((data) => {
        const nft = data.data() as { data: NFTDataType };
        setData((prev) => [...prev, { ...nft.data }]);
      });
    });
  }, []);

  return (
    <Box my="2rem">
      <Heading size="md">NFT Collection</Heading>
      <SimpleGrid columns={4} spacing={10}>
        {data.length !== 0 &&
          data.map((nft, index) => (
            <Box key={index}>
              <Image
                src={nft.imageUrl}
                alt={nft.imageUrl}
                boxSize="200px"
                objectFit="cover"
                w="100%"
              />
              <Text>Account: {nft.id}</Text>
              <Text>Name: {nft.name}</Text>
              <Text>Symbol: {nft.symbol}</Text>
              <Text>Price: {nft.price}</Text>
            </Box>
          ))}
      </SimpleGrid>
    </Box>
  );
}
