
import { Html } from '@react-three/drei';

const CanvasLoader = () => {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-medical-blue rounded-full animate-spin"></div>
        <p className="mt-4 text-sm text-medical-blue font-medium">
          Loading 3D Environment...
        </p>
      </div>
    </Html>
  );
};

export default CanvasLoader;
