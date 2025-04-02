
import { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, useTexture, Html, Environment } from '@react-three/drei';
import { Vector3, Mesh, Group } from 'three';
import { Agent } from '../agents/types/agentTypes';
import AgentCube from './AgentCube';
import AgentExperienceView from './AgentExperienceView';
import CanvasLoader from './CanvasLoader';

interface SpecialistCubesProps {
  specialists: Agent[];
  onSelectAgent: (agent: Agent) => void;
  selectedAgent: Agent | null;
  isExperienceOpen: boolean;
  onCloseExperience: () => void;
}

const SpecialistCubes = ({
  specialists,
  onSelectAgent,
  selectedAgent,
  isExperienceOpen,
  onCloseExperience
}: SpecialistCubesProps) => {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
      <Suspense fallback={<CanvasLoader />}>
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="blue" />
        
        <Scene
          specialists={specialists}
          onSelectAgent={onSelectAgent}
          selectedAgent={selectedAgent}
          isExperienceOpen={isExperienceOpen}
          onCloseExperience={onCloseExperience}
        />
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          enableRotate={true}
          minDistance={5}
          maxDistance={30}
          target={[0, 0, 0]}
        />
      </Suspense>
    </Canvas>
  );
};

interface SceneProps extends SpecialistCubesProps {}

const Scene = ({
  specialists,
  onSelectAgent,
  selectedAgent,
  isExperienceOpen,
  onCloseExperience
}: SceneProps) => {
  const { viewport } = useThree();
  const groupRef = useRef<Group>(null);

  // Calculate grid positions
  const positions: Vector3[] = [];
  const cols = Math.ceil(Math.sqrt(specialists.length));
  const spacing = 4;
  
  specialists.forEach((_, index) => {
    const row = Math.floor(index / cols);
    const col = index % cols;
    const x = (col - (cols - 1) / 2) * spacing;
    const y = ((cols - 1) / 2 - row) * spacing;
    positions.push(new Vector3(x, y, 0));
  });

  useFrame((_, delta) => {
    if (groupRef.current && !isExperienceOpen) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {specialists.map((agent, index) => (
        <AgentCube
          key={agent.id}
          agent={agent}
          position={positions[index]}
          onSelect={() => onSelectAgent(agent)}
          isSelected={selectedAgent?.id === agent.id}
          isExperienceOpen={isExperienceOpen && selectedAgent?.id === agent.id}
        />
      ))}
      
      {isExperienceOpen && selectedAgent && (
        <AgentExperienceView 
          agent={selectedAgent}
          onClose={onCloseExperience}
        />
      )}
    </group>
  );
};

export default SpecialistCubes;
