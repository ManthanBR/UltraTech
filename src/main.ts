import {
  bootstrapCameraKit,
  CameraKitSession,
  createMediaStreamSource,
} from '@snap/camera-kit';

const liveRenderTarget = document.getElementById('canvas') as HTMLCanvasElement;

let mediaStream: MediaStream;

async function init() {
  const cameraKit = await bootstrapCameraKit({
    apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzM0NjkzMzE0LCJzdWIiOiIzMmZhMmZlNC0wYmYxLTQ2N2QtODM4Mi04MTVmNzliMjFkMWJ-U1RBR0lOR35iMWI3YmFjZi01ZGI3LTQxMDAtOWIzNC0zZDEwODJmNmMyYTAifQ.681nZeSjvWHzWBiZbHY-T3Yq6M6qk3j9zgk9nM6I06M',  // Use your actual API token
  });

  const session = await cameraKit.createSession({ liveRenderTarget });
  const { lenses } = await cameraKit.lensRepository.loadLensGroups([
    'c663cd9c-c585-4e38-9ada-8204632fbdf8',
  ]);

  session.applyLens(lenses[0]);

  // Initialize the camera to use the back camera by default
  updateCamera(session);
}

async function updateCamera(session: CameraKitSession) {
  // Request the back camera by default
  mediaStream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: 'environment',  // Correct value for back camera
    },
  });

  const source = createMediaStreamSource(mediaStream, {
    cameraType: 'environment',  // Using the back camera
  });

  await session.setSource(source);

  session.play();
}

init();
