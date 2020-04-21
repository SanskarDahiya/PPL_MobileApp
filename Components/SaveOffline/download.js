const RNFS = require('react-native-fs');

// Function to save video offline
export const DownloadVideo = async ({uri, filename}, cb) => {
  try {
    if (!uri && !filename) {
      throw new Error('please pass uri and filename');
    }
    let file_Path = RNFS.DocumentDirectoryPath + '/' + filename;
    //   console.log(file_Path);

    const exists = await RNFS.exists(file_Path);
    if (exists) {
      console.log('Already downloaded');
      cb(null, file_Path);
    } else {
      console.log('Downloading Start');
      RNFS.downloadFile({
        fromUrl: uri,
        toFile: file_Path.replace(/%20/g, '_'),
        background: true,
      })
        .promise.then(res => {
          cb(null, file_Path);
          console.log('Download Complete', res);
        })
        .catch(err => {
          cb(err, null);
          console.log('err downloadFile', err);
        });
    }
  } catch (err) {
    cb(err, null);
  }
};

export const getDownloadedFile = async (filename, cb) => {
  try {
    if (!filename && typeof cb.toString() === 'function') {
      throw new Error('please pass filename and CallBack funciton');
    }
    let file_Path = RNFS.DocumentDirectoryPath + '/' + filename;
    //   console.log(file_Path);

    const exists = await RNFS.exists(file_Path);
    if (exists) {
      console.log('Already downloaded');
      cb(null, file_Path);
    } else {
      throw new Error('No File Found');
    }
  } catch (err) {
    cb(err, null);
  }
};
