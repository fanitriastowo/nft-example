import {
  Box,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { getAllNFTs, NFTDataType } from "utils/firebaseUtils";

export default function NFTCollection() {
  const [data, setData] = useState<NFTDataType[]>([]);

  useMemo(async () => {
    const collection = await getAllNFTs();

    if (collection.empty) return;

    collection.forEach((data) => {
      const nft = data.data() as { data: NFTDataType };
      setData((prev) => [...prev, { ...nft.data }]);
    });
  }, []);

  return (
    <Box my="2rem">
      <HStack w="100%">
        <Heading size="md" mb="2rem">
          NFT Collection
        </Heading>
      </HStack>
      <SimpleGrid columns={4} spacing={10}>
        {data.length !== 0 &&
          data.map((nft, index) => (
            <Box
              key={index}
              _hover={{ cursor: "pointer" }}
              border="1px solid black"
              borderRadius="md"
              p="1rem"
            >
              <Image
                src={nft.imageUrl}
                alt={nft.imageUrl}
                boxSize="200px"
                objectFit="cover"
                w="100%"
              />
              <Text>Account: {nft.id}</Text>
              <Text>Name: {nft.name}</Text>
              <Text>
                Price: {nft.price} {nft.symbol}
              </Text>
            </Box>
          ))}
      </SimpleGrid>
    </Box>
  );
}
