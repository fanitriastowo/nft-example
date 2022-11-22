import { Center, Input, Spinner, useToast } from "@chakra-ui/react";
import { ChangeEvent, useCallback, useState } from "react";
import { addData, uploadFile } from "../utils/firebaseUtils";
import { createHmac } from "crypto";
import s from "shortid";
import { getDownloadURL } from "firebase/storage";

export default function FileUpload() {
  const [loading, setLoading] = useState(false);
  const toastr = useToast();
  const handleFileUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      try {
        setLoading(true);

        // secret or salt to be hashed with
        const secret = "this is my salt";
        const sha256Hasher = createHmac("sha256", secret);
        const hash = sha256Hasher.update(s.generate()).digest("hex");

        const result = await uploadFile({
          filename: hash.toString(),
          file: e.target.files[0],
        });
        const imageUrl = await getDownloadURL(result.ref);
        await addData({
          id: hash.toString(),
          imageUrl: imageUrl,
          name: "bubba",
          price: 0.1,
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
    [toastr]
  );

  return (
    <>
      {loading && (
        <Center position="absolute" w="100%" h="100vh" bgColor="blackAlpha.300">
          <Spinner />
        </Center>
      )}
      <Input
        placeholder="Select the image"
        size="md"
        type="file"
        onChange={handleFileUpload}
      />
    </>
  );
}
