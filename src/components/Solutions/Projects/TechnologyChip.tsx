import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { alpha, useTheme } from '@mui/material/styles';
import { 
  Code, Server, Database, Cloud, Shield, Settings, 
  GitBranch, Terminal, Globe, Cpu, Lock, Network
} from 'lucide-react';

// Type for technology icon mapping
interface TechIconMapping {
  [key: string]: {
    icon: React.ElementType;
    color: string;
  };
}

// Map technologies to icons
export const technologyIconMap: TechIconMapping = {
  'React': { 
    icon: Code,  
    color: '#61DAFB'  // React blue
  },
  'TypeScript': {
    icon: Code,
    color: '#3178C6'  // TypeScript blue
  },
  'JavaScript': {
    icon: Code,
    color: '#F7DF1E'  // JavaScript yellow
  },
  'Python': {
    icon: Terminal,
    color: '#3776AB'  // Python blue
  },
  'Java': {
    icon: Terminal,
    color: '#007396'  // Java blue
  },
  'Go': {
    icon: Terminal,
    color: '#00ADD8'  // Go blue
  },
  'Golang': {
    icon: Terminal,
    color: '#00ADD8'  // Go blue
  },
  'AWS': {
    icon: Cloud,
    color: '#FF9900'  // AWS orange
  },
  'Azure': {
    icon: Cloud,
    color: '#0078D4'  // Azure blue
  },
  'Docker': {
    icon: Server,
    color: '#2496ED'  // Docker blue
  },
  'Kubernetes': {
    icon: Network,
    color: '#326CE5'  // Kubernetes blue
  },
  'PostgreSQL': {
    icon: Database,
    color: '#336791'  // PostgreSQL blue
  },
  'MongoDB': {
    icon: Database,
    color: '#4DB33D'  // MongoDB green
  },
  'Redis': {
    icon: Database,
    color: '#DC382D'  // Redis red
  },
  'Terraform': {
    icon: Settings,
    color: '#7B42BC'  // Terraform purple
  },
  'CI/CD': {
    icon: GitBranch,
    color: '#F05033'  // Git red
  },
  'Jenkins': {
    icon: GitBranch,
    color: '#D33833'  // Jenkins red
  },
  'GitHub Actions': {
    icon: GitBranch,
    color: '#2088FF'  // GitHub blue
  },
  'Ansible': {
    icon: Settings,
    color: '#EE0000'  // Ansible red
  },
  'ElasticSearch': {
    icon: Database,
    color: '#005571'  // ElasticSearch blue
  },
  'Kafka': {
    icon: Network,
    color: '#000000'  // Kafka black
  },
  'GraphQL': {
    icon: Network,
    color: '#E10098'  // GraphQL pink
  },
  'Node.js': {
    icon: Server,
    color: '#539E43'  // Node.js green
  },
  'Next.js': {
    icon: Globe,
    color: '#000000'  // Next.js black
  },
  'Spring Boot': {
    icon: Terminal,
    color: '#6DB33F'  // Spring green
  },
  'RabbitMQ': {
    icon: Network,
    color: '#FF6600'  // RabbitMQ orange
  },
  'OAuth2': {
    icon: Lock,
    color: '#2C3E50'  // Dark blue
  },
  'TensorFlow': {
    icon: Cpu,
    color: '#FF6F00'  // TensorFlow orange
  },
  'Prometheus': {
    icon: Settings,
    color: '#E6522C'  // Prometheus orange
  },
  'Grafana': {
    icon: Settings,
    color: '#F46800'  // Grafana orange
  },
  'GitOps': {
    icon: GitBranch,
    color: '#5468FF'  // Blue
  },
  'SonarQube': {
    icon: Shield,
    color: '#4E9BCD'  // SonarQube blue
  },
  'Kong': {
    icon: Network,
    color: '#21344D'  // Kong blue
  },
  'Envoy': {
    icon: Network,
    color: '#B7C1CB'  // Envoy grey
  },
  'OpenAPI': {
    icon: Code,
    color: '#85EA2D'  // OpenAPI green
  }
};

// Default icon for technologies not in the mapping
const defaultTechIcon = {
  icon: Code,
  color: '#718096'
};

// Component for displaying technologies with icons
interface TechnologyChipProps {
  tech: string;
  isHovering: boolean;
  brandColor: string;
  index: number;
}

export const TechnologyChip: React.FC<TechnologyChipProps> = ({ 
  tech, 
  isHovering, 
  brandColor,
  index 
}) => {
  const theme = useTheme();
  
  // Find icon mapping or use default
  const iconInfo = technologyIconMap[tech] || defaultTechIcon;
  const IconComponent = iconInfo.icon;
  const iconColor = iconInfo.color;
  
  return (
    <Chip
      icon={
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          ml: 0.5,
          '& > svg': {
            width: '14px',
            height: '14px'
          }
        }}>
          <IconComponent color={iconColor} />
        </Box>
      }
      label={tech}
      size="small"
      sx={{
        height: '28px',
        fontSize: '0.8rem',
        fontWeight: 600,
        borderRadius: '8px',
        mb: 0.8,
        background: `linear-gradient(120deg, ${alpha(brandColor, 0.1)}, ${alpha(brandColor, 0.25)})`,
        color: theme.palette.text.primary,
        border: `1px solid ${alpha(brandColor, 0.3)}`,
        transition: 'all 0.3s ease',
        animation: isHovering ? `pulse ${3 + index % 2}s ease-in-out infinite` : 'none',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: `0 4px 8px ${alpha(brandColor, 0.3)}`,
          background: `linear-gradient(120deg, ${alpha(brandColor, 0.2)}, ${alpha(brandColor, 0.35)})`,
        },
        '& .MuiChip-label': { 
          px: 1,
          pl: 0.5
        },
      }}
    />
  );
};

export default TechnologyChip;