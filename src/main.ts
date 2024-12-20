import {
  bootstrapCameraKit,
  CameraKitSession,
  createMediaStreamSource,
} from '@snap/camera-kit';

const liveRenderTarget = document.getElementById('canvas') as HTMLCanvasElement;

let mediaStream: MediaStream;

async function init() {
  const cameraKit = await bootstrapCameraKit({
    apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzI2NTY1MzEwLCJzdWIiOiIyN2NmNDQwYy04YjBkLTQ5ZDEtYTM2MC04YjdkODQ5OTM3ZWJ-U1RBR0lOR340Y2ZhYTJiOC1kYWY4LTRhZDYtODYwNy1iMmI5NWYzMDVmMzAifQ.q8qMDDOzMv4jFiZ8NRqQ8-qDJMV4l5YmOex67WC6DqI',  // Use your actual API token
  });

  const session = await cameraKit.createSession({ liveRenderTarget });
  const { lenses } = await cameraKit.lensRepository.loadLensGroups([
    '276ddfa1-5fbe-4099-aaaf-ceb9c81bb17f',
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
