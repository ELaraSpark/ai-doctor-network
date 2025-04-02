
import { useRef, useState, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Agent } from '../agents/types/agentTypes';
import AgentChatInterface from './AgentChatInterface';

interface AgentExperienceViewProps {
  agent: Agent;
  onClose: () => void;
}

// Define orbital button types
type OrbitalButton = {
  id: string;
  label: string;
  icon: string;
  position: THREE.Vector3;
  action: () => void;
};

const AgentExperienceView = ({ agent, onClose }: AgentExperienceViewProps) => {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const [isFullyOpened, setIsFullyOpened] = useState(false);
  const [openAnimation, setOpenAnimation] = useState(true);
  const [scale, setScale] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [chatScale, setChatScale] = useState(0);
  const buttonsRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  
  // Define orbital buttons
  const orbitalButtons: OrbitalButton[] = [
    {
      id: 'chat',
      label: 'Chat',
      icon: '💬',
      position: new THREE.Vector3(2, 1, 0),
      action: () => setShowChat(true)
    },
    {
      id: 'info',
      label: 'Info',
      icon: 'ℹ️',
      position: new THREE.Vector3(0, 2, 0),
      action: () => console.log('Info button clicked')
    },
    {
      id: 'medical',
      label: 'Medical Records',
      icon: '📋',
      position: new THREE.Vector3(-2, 0, 0),
      action: () => console.log('Medical records button clicked')
    },
    {
      id: 'close',
      label: 'Close',
      icon: '✖️',
      position: new THREE.Vector3(0, -2, 0),
      action: onClose
    }
  ];
  
  // Store original camera position
  const originalCameraPosition = useRef(new THREE.Vector3());
  const cameraTargetPosition = useRef(new THREE.Vector3(0, 0.5, 10));
  
  // Move the camera to focus on the experience
  useEffect(() => {
    // Save the original camera position
    originalCameraPosition.current.copy(camera.position);
    
    // Set camera position to focus on the agent sphere
    camera.position.set(0, 0, 10);
    
    return () => {
      // Reset camera position when component unmounts
      camera.position.copy(originalCameraPosition.current);
    };
  }, [camera]);

  // Control the opening animation
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (openAnimation) {
      timeout = setTimeout(() => {
        setIsFullyOpened(true);
      }, 1500);
    }
    
    return () => clearTimeout(timeout);
  }, [openAnimation]);

  // Handle chat opening animation
  useEffect(() => {
    if (showChat) {
      const chatAnimateInterval = setInterval(() => {
        setChatScale(prev => {
          const newScale = prev + 0.05;
          if (newScale >= 1) {
            clearInterval(chatAnimateInterval);
            return 1;
          }
          return newScale;
        });
      }, 16);
      
      return () => clearInterval(chatAnimateInterval);
    } else {
      setChatScale(0);
    }
  }, [showChat]);

  // Handle the opening animation
  useEffect(() => {
    if (openAnimation && scale < 1) {
      setScale(prev => Math.min(prev + 0.04, 1));
    }
  }, [openAnimation, scale]);

  // Close chat and return to sphere view
  const handleCloseChat = () => {
    setShowChat(false);
  };
  
  // Add interaction with the sphere environment
  useFrame((_, delta) => {
    // Animate the sphere gently
    if (sphereRef.current) {
      // Subtle pulsing effect
      const pulseScale = 1 + Math.sin(Date.now() * 0.001) * 0.02;
      sphereRef.current.scale.setScalar(pulseScale);
    }
    
    // Ensure buttons always face the camera
    if (buttonsRef.current && isFullyOpened) {
      orbitalButtons.forEach((_, index) => {
        const buttonGroup = buttonsRef.current?.children[index] as THREE.Group;
        if (buttonGroup) {
          buttonGroup.lookAt(camera.position);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Environment sphere */}
      <mesh 
        scale={[scale * 8, scale * 8, scale * 8]}
        onClick={(e) => {
          // Allow navigation inside the sphere
          e.stopPropagation();
          // The sphere is clickable but doesn't do anything specific yet
        }}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          color="#0a192f" 
          side={THREE.BackSide}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Inner environment effects - stars */}
      {isFullyOpened && Array.from({ length: 100 }).map((_, i) => {
        const position = new THREE.Vector3(
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 14
        );
        return (
          <mesh key={i} position={position} scale={0.05}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        );
      })}
      
      {/* Agent representation - now a sphere */}
      <group position={[0, 0.5, -2]} scale={[scale, scale, scale]}>
        <mesh ref={sphereRef}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial 
            color="#4287f5" 
            emissive="#2c5aa0"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        <Html position={[0, -1.5, 0]} center distanceFactor={10}>
          <div className="text-white font-bold text-center text-lg" style={{ textShadow: '0 0 5px #000' }}>
            {agent.name}
          </div>
        </Html>
        
        <Html position={[0, -2, 0]} center distanceFactor={10}>
          <div className="text-gray-300 text-center text-sm" style={{ textShadow: '0 0 5px #000' }}>
            {agent.specialty}
          </div>
        </Html>
      </group>
      
      {/* Static action buttons around the agent sphere */}
      {isFullyOpened && (
        <group ref={buttonsRef} position={[0, 0.5, -2]}>
          {orbitalButtons.map((button) => (
            <group key={button.id} position={button.position}>
              <mesh 
                onClick={(e) => {
                  e.stopPropagation();
                  button.action();
                }}
                onPointerOver={(e) => {
                  document.body.style.cursor = 'pointer';
                  e.stopPropagation();
                }}
                onPointerOut={() => {
                  document.body.style.cursor = 'auto';
                }}
              >
                <sphereGeometry args={[0.4, 24, 24]} />
                <meshStandardMaterial 
                  color="#64b5f6" 
                  emissive="#3a7dca"
                  emissiveIntensity={0.3}
                  metalness={0.5}
                  roughness={0.3}
                />
              </mesh>
              
              <Html center>
                <div className="text-center">
                  <div className="text-2xl">{button.icon}</div>
                  <div className="text-xs text-white mt-1" style={{ textShadow: '0 0 3px #000' }}>
                    {button.label}
                  </div>
                </div>
              </Html>
            </group>
          ))}
        </group>
      )}
      
      {/* Chat interface */}
      {isFullyOpened && showChat && (
        <group position={[0, 0.5, 0]} scale={[chatScale, chatScale, chatScale]}>
          <Html
            position={[0, 0, 0]}
            transform
            distanceFactor={10}
            style={{ 
              width: '400px', 
              height: '500px',
              opacity: chatScale,
              transition: 'opacity 0.3s ease-in-out'
            }}
            // Important: stop propagation to prevent clicks from reaching elements behind
            onClick={(e) => e.stopPropagation()}
          >
            <AgentChatInterface agent={agent} onClose={handleCloseChat} />
          </Html>
        </group>
      )}
    </group>
  );
};

export default AgentExperienceView;
