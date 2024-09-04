import FBXLoader from "./FBXLoader";

interface BookedSignProps {
  rotation?: [number, number, number];
  position?: [number, number, number]
  scale?: number;
}

function BookedSign(props: BookedSignProps) {
  return <FBXLoader {...props} path="/booked_sign.fbx" scale={0.014} {...props} />
}

export default BookedSign;