import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../connections/firebase";

export interface NFTDataType {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  symbol: "ETH";
}

export interface FileUploadType {
  filename: string;
  file: File;
}

export async function uploadFile(param: FileUploadType) {
  const storageRef = ref(
    storage,
    `public/${param.filename}.${param.file.name.split(".").pop()}`
  );
  return await uploadBytes(storageRef, param.file);
}

export async function addData(data: NFTDataType) {
  return await setDoc(doc(db, "nfts", data.id), {
    data,
  });
}

export async function getAllNFTs() {
  return await getDocs(collection(db, "nfts"));
}
