import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../connections/firebase";

export interface NFTDataType {
  name: string;
  imageUrl: string;
  price: number;
}

export async function uploadFile(file: File) {
  const storageRef = ref(storage, "public/" + file.name);
  return await uploadBytes(storageRef, file);
}

export async function addData(data: NFTDataType) {
  await setDoc(doc(db, "nfts", data.), {
    name: "Los Angeles",
    state: "CA",
    country: "USA",
  });
}
