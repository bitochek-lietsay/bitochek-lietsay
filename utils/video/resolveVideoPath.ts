import { codec } from "./avalibleFormat"

export const resolveVideoPath = (folderPath: string) => {
  if (!codec) {
    throw new Error("[resolveVideoPath]: video is not available");
    
  }
  
  return `${folderPath.replace(/\/$/, '')}/${codec.name}.${codec.extension}`
}
