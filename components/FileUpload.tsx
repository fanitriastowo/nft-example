import {
  Button,
  Center,
  HStack,
  Input,
  Spinner,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { addData, uploadFile } from "../utils/firebaseUtils";
import { createHmac } from "crypto";
import s from "shortid";
import { getDownloadURL } from "firebase/storage";

interface FormDataType {
  [type: string]: string | File | number;
}

export default function FileUpload() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FormDataType>();
  const toastr = useToast();

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      try {
        setLoading(true);
        event.preventDefault();

        if (!data) return;

        // secret or salt to be hashed with
        const secret = "this is my salt";
        const sha256Hasher = createHmac("sha256", secret);
        const hash = sha256Hasher.update(s.generate()).digest("hex");

        const result = await uploadFile({
          filename: hash.toString(),
          file: data.file as File,
        });
        const imageUrl = await getDownloadURL(result.ref);
        await addData({
          id: hash.toString(),
          imageUrl: imageUrl,
          name: data.name as string,
          price: data.price as number,
          symbol: "ETH",
        });

        toastr({
          title: "Success",
          status: "success",
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log({ error });
      }
    },
    [data, toastr]
  );

  const updateData = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.files ? e.target.files[0] : e.target.value,
    });
  };

  return (
    <>
      {loading && (
        <Center position="absolute" w="100%" h="100vh" bgColor="blackAlpha.300">
          <Spinner />
        </Center>
      )}
      <form onSubmit={onSubmit}>
        <VStack spacing="1rem">
          <Input
            placeholder="Name"
            type="text"
            name="name"
            onChange={updateData}
            required
          />
          <HStack w="100%">
            <Input
              placeholder="Price"
              type="number"
              name="price"
              step="any"
              onChange={updateData}
              required
            />
            <Input
              placeholder="Symbol"
              type="text"
              name="symbol"
              onChange={updateData}
              value="ETH"
              readOnly
            />
          </HStack>
          <Input
            placeholder="Select the image"
            type="file"
            name="file"
            onChange={updateData}
            required
          />
          <Button type="submit">Save</Button>
        </VStack>
      </form>
    </>
  );
}
