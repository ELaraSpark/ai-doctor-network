
import { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Agent } from '../agents/types/agentTypes';

interface AgentCubeProps {
  agent: Agent;
  position: THREE.Vector3;
  onSelect: () => void;
  isSelected: boolean;
  isExperienceOpen: boolean;
}

const AgentCube = ({ 
  agent, 
  position, 
  onSelect, 
  isSelected,
  isExperienceOpen
}: AgentCubeProps) => {
  const cubeRef = useRef<THREE.Mesh>(null);
  const labelRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [currentPosition] = useState(new THREE.Vector3());
  
  // Colors based on the agent's specialty
  const getColorScheme = () => {
    const baseColor = new THREE.Color('#1e88e5');
    const hoverColor = new THREE.Color('#64b5f6');
    const selectedColor = new THREE.Color('#0d47a1');
    
    return { baseColor, hoverColor, selectedColor };
  };
  
  const { baseColor, hoverColor, selectedColor } = getColorScheme();
  
  // Handle transition to new positions
  useFrame((_, delta) => {
    if (!cubeRef.current || !labelRef.current) return;
    
    // Update position with lerp for smooth transitions
    if (position) {
      currentPosition.lerp(position, 0.1);
      cubeRef.current.position.copy(currentPosition);
      
      // Keep labels positioned under the cube
      if (labelRef.current) {
        labelRef.current.position.x = currentPosition.x;
        labelRef.current.position.y = currentPosition.y - 2;
        labelRef.current.position.z = currentPosition.z;
      }
    }
    
    // Handle rotation based on state
    if (isExperienceOpen) {
      // No rotation while experience is open
      return;
    } else if (isSelected) {
      cubeRef.current.rotation.x += delta * 2;
      cubeRef.current.rotation.y += delta * 2;
      cubeRef.current.rotation.z += delta * 2;
    } else if (hovered && !clicked) {
      cubeRef.current.rotation.y += delta * 0.5;
    } else if (!clicked) {
      cubeRef.current.rotation.y += delta * 0.1;
    }
  });

  useEffect(() => {
    if (cubeRef.current) {
      if (isExperienceOpen) {
        // Shrink and hide the cube when experience is open
        cubeRef.current.scale.set(0.01, 0.01, 0.01);
        cubeRef.current.visible = isSelected ? false : true;
      } else {
        // Reset the cube when experience is closed
        cubeRef.current.scale.set(1, 1, 1);
        cubeRef.current.visible = true;
      }
    }
    
    // Initialize the current position
    if (position) {
      currentPosition.copy(position);
    }
  }, [isExperienceOpen, isSelected, position, currentPosition]);

  // Create a proper THREE.Vector3 for the initial label position
  const initialLabelPosition = position 
    ? new THREE.Vector3(position.x, position.y - 2, position.z) 
    : new THREE.Vector3(0, -2, 0);

  return (
    <group>
      <mesh
        ref={cubeRef}
        onPointerOver={() => !isExperienceOpen && setHovered(true)}
        onPointerOut={() => !isExperienceOpen && setHovered(false)}
        onClick={(e) => {
          if (isExperienceOpen) return;
          e.stopPropagation();
          setClicked(!clicked);
          onSelect();
        }}
        scale={hovered && !isExperienceOpen ? [1.1, 1.1, 1.1] : [1, 1, 1]}
      >
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        <meshStandardMaterial 
          color={isSelected ? selectedColor : (hovered ? hoverColor : baseColor)} 
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>
      
      {/* Text labels with proper positioning */}
      <group ref={labelRef} position={initialLabelPosition}>
        <Html center>
          <div className="flex flex-col items-center">
            <div className="text-white font-bold text-center text-xs mb-1" style={{ textShadow: '0 0 5px #000' }}>
              {agent.name}
            </div>
            <div className="text-gray-300 text-center text-xs" style={{ textShadow: '0 0 5px #000' }}>
              {agent.specialty}
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
};

export default AgentCube;
