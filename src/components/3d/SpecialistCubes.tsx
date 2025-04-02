
import { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Environment } from '@react-three/drei';
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
  const [cubePositions, setCubePositions] = useState<Vector3[]>([]);
  const [topLinePositions, setTopLinePositions] = useState<Vector3[]>([]);

  // Calculate grid positions
  useEffect(() => {
    const initialPositions: Vector3[] = [];
    const topLinePos: Vector3[] = [];
    
    const cols = Math.ceil(Math.sqrt(specialists.length));
    const spacing = 4;
    
    // Calculate initial grid layout
    specialists.forEach((_, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const x = (col - (cols - 1) / 2) * spacing;
      const y = ((cols - 1) / 2 - row) * spacing;
      initialPositions.push(new Vector3(x, y, 0));
      
      // Calculate top line positions for when a cube is selected
      const topX = (index - (specialists.length - 1) / 2) * 3;
      topLinePos.push(new Vector3(topX, 8, -5));
    });
    
    setCubePositions(initialPositions);
    setTopLinePositions(topLinePos);
  }, [specialists.length]);

  useFrame((_, delta) => {
    if (groupRef.current && !isExperienceOpen) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {specialists.map((agent, index) => {
        // Determine position based on whether there's a selected agent
        const targetPosition = isExperienceOpen 
          ? (agent.id === selectedAgent?.id ? new Vector3(0, 0, 0) : topLinePositions[index])
          : cubePositions[index];

        const isCurrentSelected = agent.id === selectedAgent?.id;

        return (
          <AgentCube
            key={agent.id}
            agent={agent}
            position={targetPosition}
            onSelect={() => onSelectAgent(agent)}
            isSelected={isCurrentSelected}
            isExperienceOpen={isExperienceOpen && isCurrentSelected}
          />
        );
      })}
      
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
