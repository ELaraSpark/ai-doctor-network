
import { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
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
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  // Colors based on the agent's specialty
  const getColorScheme = () => {
    const baseColor = new THREE.Color('#1e88e5');
    const hoverColor = new THREE.Color('#64b5f6');
    const selectedColor = new THREE.Color('#0d47a1');
    
    return { baseColor, hoverColor, selectedColor };
  };
  
  const { baseColor, hoverColor, selectedColor } = getColorScheme();

  useFrame((_, delta) => {
    if (!cubeRef.current || isExperienceOpen) return;
    
    if (isSelected) {
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
        cubeRef.current.visible = false;
      } else {
        // Reset the cube when experience is closed
        cubeRef.current.scale.set(1, 1, 1);
        cubeRef.current.visible = true;
      }
    }
  }, [isExperienceOpen]);

  return (
    <group position={position}>
      <mesh
        ref={cubeRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          setClicked(!clicked);
          onSelect();
        }}
        scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
      >
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        <meshStandardMaterial 
          color={isSelected ? selectedColor : (hovered ? hoverColor : baseColor)} 
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>
      
      <Text
        position={[0, -2, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
      >
        {agent.name}
      </Text>
      
      <Text
        position={[0, -2.6, 0]}
        fontSize={0.3}
        color="#a0a0a0"
        anchorX="center"
        anchorY="middle"
      >
        {agent.specialty}
      </Text>
    </group>
  );
};

export default AgentCube;
