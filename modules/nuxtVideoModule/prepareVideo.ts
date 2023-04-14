import { createFFmpeg } from '@ffmpeg/ffmpeg';
import path from 'node:path'
import fs from 'node:fs/promises'
import {constants as fsConstants} from 'node:fs'

const ffmpegInstance = createFFmpeg({
  log: true,
})

let ffmpegLoadingPromise: Promise<void> | undefined = ffmpegInstance.load();

async function getFFmpeg() {
  if (ffmpegLoadingPromise) {
      await ffmpegLoadingPromise;
      ffmpegLoadingPromise = undefined;
  }

  return ffmpegInstance;
}

const findByName = async (dir: string, name: string, matchedFiles: string[] = []) => {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const fileFullPath = path.join(dir, file)
    const fileStat = await fs.stat(fileFullPath)

    if (fileStat.isDirectory()) {
      await findByName(fileFullPath, name, matchedFiles)
    }

    // Method 1:
    const filename = path.parse(file).base;

    if (filename === name) {
        matchedFiles.push(fileFullPath);
    }
  }

  return matchedFiles;
};

const isExists = async (file: string) => {
  try {
    await fs.access(file, fsConstants.F_OK)

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const prepareVideo = async () => {
  const files = await findByName(path.join(__dirname, '../../public'), 'h264.mp4')
  const ffmpeg = await getFFmpeg();

  for (const file of files) {
    const inputFileName = path.basename(file)
    const inputFileBuffer = await fs.readFile(file)
  
    ffmpeg.FS('writeFile', inputFileName, inputFileBuffer)

    const fileVp8name = 'vp8.webm'
    const fileVp8Path = path.join(path.dirname(file), fileVp8name)

    const fileVp9name = 'vp9.webm'
    const fileVp9Path = path.join(path.dirname(file), fileVp9name)

    const coverName = 'cover.jpg'
    const coverPath = path.join(path.dirname(file), coverName)

    if (!(await isExists(coverPath))) {
      console.log(coverPath)
      await ffmpeg.run(
        '-ss', '00:00:01.000',
        '-i', inputFileName,
        '-frames:v', '1',
        coverName,
      );
  
      const screenShotData = ffmpeg.FS('readFile', coverName)
  
      ffmpeg.FS('unlink', coverName);
      
      await fs.writeFile(coverPath, screenShotData)
    }

    if (!(await isExists(fileVp8Path))) {
      console.log(fileVp8Path)

      await ffmpeg.run(
        '-i', inputFileName,
        '-c:v', 'libvpx',
        '-qmin', '0', '-qmax', '50', '-crf', '5', '-b:v', '500k',
        '-vf', 'scale=-1:680',
        fileVp8name,
      );
  
      const vp8Data = ffmpeg.FS('readFile', fileVp8name)
  
      ffmpeg.FS('unlink', fileVp8name);
  
      await fs.writeFile(fileVp8Path, vp8Data)
    }

    if (!(await isExists(fileVp9Path))) {
      console.log(fileVp9Path)

      await ffmpeg.run(
        '-i', inputFileName,
        '-c:v', 'libvpx-vp9',
        '-minrate', '100k', '-b:v', '500k', '-maxrate', '1500k',
        '-vf', 'scale=-1:680',
        fileVp9name,
      );
  
      const vp9Data = ffmpeg.FS('readFile', fileVp9name)
  
      ffmpeg.FS('unlink', fileVp9name)
  
      await fs.writeFile(fileVp9Path, vp9Data)
    }

    ffmpeg.FS('unlink', inputFileName)
  }

  console.log(files)
}
