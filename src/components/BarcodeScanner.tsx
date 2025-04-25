import React, { useState, useRef, useEffect } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { Result } from '@zxing/library';
import { Box, Typography, CircularProgress } from '@mui/material';

interface BarcodeScannerProps {
  onScan: (result: string) => void;
  onError?: (error: Error) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan, onError }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useRef<BrowserMultiFormatReader | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const initScanner = async () => {
      try {
        codeReader.current = new BrowserMultiFormatReader();
        const devices = await codeReader.current.getVideoInputDevices();
        
        if (devices.length === 0) {
          throw new Error('No video input devices found');
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: devices[0].deviceId }
        });
        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        codeReader.current.decodeFromVideoDevice(
          devices[0].deviceId,
          videoRef.current!,
          (result: Result | null, err?: Error) => {
            if (result) {
              onScan(result.getText());
            }
            if (err && onError) {
              onError(err);
            }
          }
        );
        
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize scanner');
        setIsLoading(false);
      }
    };

    initScanner();

    return () => {
      // Cleanup function
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (codeReader.current) {
        codeReader.current.reset();
      }
    };
  }, [onScan, onError]);

  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: 640, margin: '0 auto' }}>
      <video
        ref={videoRef}
        style={{ width: '100%', height: 'auto' }}
        playsInline
      />
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default BarcodeScanner; 