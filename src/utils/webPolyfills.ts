// Polyfill for web camera access
if (typeof navigator !== 'undefined' && !navigator.mediaDevices?.getUserMedia) {
  navigator.mediaDevices = {
    ...navigator.mediaDevices,
    getUserMedia: async (constraints: MediaStreamConstraints): Promise<MediaStream> => {
      const getUserMedia =
        navigator.getUserMedia ||
        (navigator as any).webkitGetUserMedia ||
        (navigator as any).mozGetUserMedia ||
        (navigator as any).msGetUserMedia;

      if (!getUserMedia) {
        throw new Error('getUserMedia is not implemented in this browser');
      }

      return new Promise((resolve, reject) => {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    },
  };
} 