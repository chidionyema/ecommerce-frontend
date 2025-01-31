'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Button,
  useTheme,
  alpha,
  Tooltip,
  Grid,
  Container,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightAlt } from '@mui/icons-material';
import { Cloud, Code2, Cpu, Database, GitBranch, Layers, Server, Terminal, BoxIcon } from 'lucide-react';
import NextLink from 'next/link';
import { RadialBarChart, RadialBar } from 'recharts';

const technologyIconMap = {
  '.NET Core': Code2,
  Java: Terminal,
  WebSockets: GitBranch,
  RabbitMQ: Database,
  MQTT: Layers,
  Docker: Server,
  Kubernetes: Cloud,
  Terraform: BoxIcon,
  AWS: Cloud,
  Azure: Cloud,
  'C#': Cpu,
  'EF Core': Database,
  SQL: Database,
};

const projects = [
  {
    id: '1',
    name: 'Airspace Security & Drone Defense',
    description:
      'Real-time threat detection and situational intelligence platform for critical infrastructures.',
    technologies: ['.NET Core', 'Java', 'WebSockets', 'RabbitMQ', 'Docker', 'Kubernetes'],
    metrics: [
      { label: 'Latency', value: '<500ms' },
      { label: 'Threat Detection', value: '40% faster' },
    ],
    iconColor: '#2563eb',
  },
  {
    id: '2',
    name: 'Digital Justice Platform',
    description:
      'GDS-compliant digital services modernizing legal proceedings, including online pleas and certification applications.',
    technologies: ['Terraform', 'Kubernetes', 'AWS', 'Azure', 'Java'],
    metrics: [
      { label: 'Form Completion Time', value: '-50%' },
      { label: 'Accessibility Score', value: 'WCAG 2.1 AA' },
    ],
    iconColor: '#9333ea',
  },
  {
    id: '3',
    name: 'High-Performance Cash Optimization',
    description:
      'A cutting-edge cash deposit platform enabling real-time rate adjustments and compliance tracking.',
    technologies: ['.NET Core', 'C#', 'EF Core', 'Azure', 'SQL'],
    metrics: [
      { label: 'Daily Transaction Volume', value: '£1B+' },
      { label: 'Build Times', value: '-50%' },
    ],
    iconColor: '#16a34a',
  },
];

const ProjectOverviewCard = ({ project, isSelected, onClick }) => {
  const theme = useTheme();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      style={{
        flex: '0 0 280px',
        borderRadius: 8,
        background: alpha(theme.palette.background.paper, 0.9),
        padding: theme.spacing(3),
        boxShadow: theme.shadows[2],
        cursor: 'pointer',
        border: `2px solid ${isSelected ? project.iconColor : 'transparent'}`,
        opacity: isSelected ? 1 : 0.8,
      }}
      onClick={onClick}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            background: alpha(project.iconColor, 0.1),
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BoxIcon size={24} color={project.iconColor} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {project.name}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {project.description}
      </Typography>
    </motion.div>
  );
};

const MetricRadialBar = ({ value, label, color }) => {
  const numericValue = parseInt(value.replace(/\D/g, ''), 10);

  return (
    <Box sx={{ textAlign: 'center' }}>
      <RadialBarChart width={120} height={120} innerRadius="70%" outerRadius="100%" data={[{ value: numericValue, fill: color }]}>
        <RadialBar background dataKey="value" cornerRadius={10} />
      </RadialBarChart>
      <Typography variant="h6" sx={{ mt: -8, fontWeight: 700, color }}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );
};

const FeatureSet = () => {
  const theme = useTheme();
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <Container sx={{ py: 10, px: { xs: 2, sm: 4 } }}>
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: 900,
          mb: 6,
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Enterprise-Grade Solutions
      </Typography>

      <Grid container spacing={4}>
        {/* Column 1: Overview Carousel */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: 'flex',
              overflowX: 'auto',
              gap: 3,
              pb: 2,
              '&::-webkit-scrollbar': { height: 8 },
              '&::-webkit-scrollbar-thumb': { background: theme.palette.primary.main },
            }}
          >
            {projects.map((project) => (
              <ProjectOverviewCard
                key={project.id}
                project={project}
                isSelected={selectedProjectId === project.id}
                onClick={() => setSelectedProjectId(project.id)}
              />
            ))}
          </Box>
        </Grid>

        {/* Column 2: Details Panel */}
        <Grid item xs={12} md={4}>
          <motion.div
            key={selectedProjectId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                background: alpha(theme.palette.background.paper, 0.9),
                borderRadius: 4,
                p: 4,
                boxShadow: theme.shadows[4],
                height: '100%',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Technical Details
              </Typography>
              <Grid container spacing={1} sx={{ mb: 4 }}>
                {selectedProject.technologies.map((tech) => {
                  const TechIcon = technologyIconMap[tech];
                  return (
                    <Grid item key={tech}>
                      <Tooltip title={tech}>
                        <Chip
                          icon={<TechIcon size={16} />}
                          label={tech}
                          size="small"
                          sx={{
                            background: alpha(selectedProject.iconColor, 0.1),
                            '&:hover': { background: alpha(selectedProject.iconColor, 0.2) },
                          }}
                        />
                      </Tooltip>
                    </Grid>
                  );
                })}
              </Grid>
              <Button
                component={NextLink}
                href={`/projects/${selectedProjectId}`}
                variant="contained"
                endIcon={<ArrowRightAlt />}
                sx={{
                  background: selectedProject.iconColor,
                  color: theme.palette.getContrastText(selectedProject.iconColor),
                  '&:hover': { background: alpha(selectedProject.iconColor, 0.8) },
                }}
              >
                Case Study
              </Button>
            </Box>
          </motion.div>
        </Grid>

        {/* Column 3: Metrics Panel */}
        <Grid item xs={12} md={4}>
          <motion.div
            key={selectedProjectId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                background: alpha(theme.palette.background.paper, 0.9),
                borderRadius: 4,
                p: 4,
                boxShadow: theme.shadows[4],
                height: '100%',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
                Performance Metrics
              </Typography>
              <Grid container spacing={4}>
                {selectedProject.metrics.map((metric, index) => (
                  <Grid item xs={12} sm={6} md={12} key={index}>
                    <MetricRadialBar value={metric.value} label={metric.label} color={selectedProject.iconColor} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FeatureSet;
