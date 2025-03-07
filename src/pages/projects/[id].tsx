

export const config = {
  runtime: 'experimental-edge'
};

import { useParams, useRouter } from 'next/navigation';
import { useMemo, useRef, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Grid,
  useTheme,
  Fade,
  Divider,
  Chip,
  Avatar,
  Tooltip,
  Backdrop,
  Button,
  IconButton,
  Tabs,
  Tab,
  useMediaQuery,
} from '@mui/material';
import { alpha, darken } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowBack, 
  CalendarMonth, 
  People, 
  Code, 
  BusinessCenter, 
  ChevronRight, 
  ChevronLeft, 
  Share, 
  BookmarkAdd, 
  Download, 
  MoreVert,
  LightbulbOutlined,
  Timeline,
  EmojiEvents,
  School
} from '@mui/icons-material';
import { cvProjects } from '../../data/cvProjects';
import { Project } from '../../types/project';
import ConsistentPageLayout from '../../components/Shared/ConsistentPageLayout';
import QuickFacts from '../../components/Project/QuickFacts';
import { LessonsLearned } from '../../components/Project/LessonsLearned';
import { ChallengeSection } from '../../components/Project/ChallengeSection';
import { ApproachTimeline } from '../../components/Project/ApproachTimeline';
import { MetricTilesContainer } from '../../components/Project/MetricsSection';
import { AchievementsList } from '../../components/Project/AchievementsList';
import { GlassCard } from '../../components/Theme/GlassCard';

/**
 * Enhanced ProjectDetails Component
 * 
 * An ultra-modern, polished presentation of a project case study
 * with advanced animations, streamlined UI, and improved user experience.
 */
const ProjectDetails = () => {
  const theme = useTheme();
  const params = useParams();
  const router = useRouter();
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const projectId = params?.id as string;
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  
  // Find the project based on the URL parameter
  const project = useMemo(
    () => cvProjects.find(p => p.id === projectId),
    [projectId]
  );

  // Find next and previous projects for navigation
  const [prevProject, nextProject] = useMemo(() => {
    if (!project) return [null, null];
    const projectIndex = cvProjects.findIndex((p) => p.id === projectId);
    const prev = projectIndex > 0 ? cvProjects[projectIndex - 1] : null;
    const next = projectIndex < cvProjects.length - 1 ? cvProjects[projectIndex + 1] : null;
    return [prev, next];
  }, [project, projectId]);

  // Handle animation sequence and scroll tracking
  useEffect(() => {
    if (project) {
      setIsLoading(false);
    }

    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight = 
        document.documentElement.scrollHeight - 
        document.documentElement.clientHeight;
      const scrollPercent = scrollTop / docHeight;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [project]);

  // Handle tab changes
// Handle tab changes
const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
  setActiveTab(newValue);
};
  // Navigation handlers
// Navigation handlers
const handleNavigateTo = (id: string | undefined) => {
  if (!id) {
    console.error('Attempted to navigate to undefined project ID');
    return; // Exit early if id is undefined
  }
  router.push(`/projects/${id}`);
};
  // Section heading style for consistency
  const sectionHeadingStyle = {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    mb: 3,
    mt: 1,
  };

  // Tab panel component for mobile view
// Tab panel component for mobile view
const TabPanel = ({ children, value, index }: { 
  children: React.ReactNode; 
  value: number; 
  index: number 
}) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`project-tabpanel-${index}`}
    aria-labelledby={`project-tab-${index}`}
  >
    {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
  </div>
);
  // Loading state
  if (isLoading || !project) {
    return (
      <Container
        sx={{
          display: 'flex',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CircularProgress size={60} thickness={4} color="primary" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Typography variant="h4" sx={{ mt: 2 }}>
            Loading Project...
          </Typography>
        </motion.div>
      </Container>
    );
  }

  return (
    <ConsistentPageLayout
      seoTitle={`${project.name} | Case Study | GLUStack`}
      seoDescription={`Learn how we helped ${project.clientName} with ${project.description}`}
      seoKeywords={`case study, ${project.tags?.join(', ')}, technical solution, GLUStack`}
      title={project.name}
      subtitle={project.description}
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box 
            component="div" 
            ref={containerRef}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              minHeight: '100vh',
            }}
          >
            {/* Progress indicator */}
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                zIndex: 1100,
                background: theme.palette.background.paper,
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: `${scrollProgress * 100}%`,
                  background: theme.palette.primary.main,
                  transition: 'width 0.1s',
                }}
              />
            </Box>

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, my: 4 }}>
              {/* Navigation */}
              <Box 
                sx={{ 
                  position: 'relative', 
                  mb: 5, 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center' 
                }}
              >
                <motion.div
                  whileHover={{ x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ArrowBack />}
                    onClick={() => router.back()}
                    sx={{
                      borderRadius: '24px',
                      padding: '8px 24px',
                    }}
                  >
                    All Projects
                  </Button>
                </motion.div>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title="Save Project">
                    <IconButton color="primary" sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
                      <BookmarkAdd />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Share">
                    <IconButton color="primary" sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
                      <Share />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Download PDF">
                    <IconButton color="primary" sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
                      <Download />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              
              {/* Project Header Section - Enhanced */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <GlassCard
                  sx={{
                    mb: 6,
                    position: 'relative',
                    p: { xs: 3, md: 5 },
                    borderRadius: 4,
                    boxShadow: theme.shadows[4],
                    background: alpha(theme.palette.background.paper, 0.8),
                    backdropFilter: 'blur(10px)',
                    overflow: 'hidden',
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
                      <Box 
                        sx={{ 
                          width: { xs: '100%', md: '30%' },
                          height: { xs: '200px', md: '250px' },
                          borderRadius: 3,
                          overflow: 'hidden',
                          position: 'relative',
                          boxShadow: theme.shadows[3],
                        }}
                      >
                     
                      </Box>
                      
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          {project.tags?.map((tag, index) => (
                            <Chip 
                              key={index} 
                              label={tag} 
                              size="small" 
                              sx={{ 
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                color: theme.palette.primary.main,
                                fontWeight: 'medium',
                              }} 
                            />
                          ))}
                        </Box>
                        
                        <Typography 
                          variant="h3" 
                          component="h1" 
                          sx={{ 
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            fontWeight: 700,
                            mb: 2,
                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          {project.name}
                        </Typography>
                        
                        <Typography 
                          variant="subtitle1" 
                          sx={{ mb: 3, color: theme.palette.text.secondary, lineHeight: 1.6 }}
                        >
                          {project.description}
                        </Typography>
                        
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <Avatar 
                                sx={{ 
                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                  color: theme.palette.primary.main,
                                  width: 40,
                                  height: 40,
                                }}
                              >
                                <BusinessCenter fontSize="small" />
                              </Avatar>
                              <Box>
                                <Typography variant="body2" color="text.secondary">Client</Typography>
                                <Typography variant="body1" fontWeight="medium">{project.clientName}</Typography>
                              </Box>
                            </Box>
                          </Grid>
                          
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <Avatar 
                                sx={{ 
                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                  color: theme.palette.primary.main,
                                  width: 40,
                                  height: 40,
                                }}
                              >
                                <CalendarMonth fontSize="small" />
                              </Avatar>
                              <Box>
                                <Typography variant="body2" color="text.secondary">Timeline</Typography>
                                <Typography variant="body1" fontWeight="medium">{project.timeline}</Typography>
                              </Box>
                            </Box>
                          </Grid>
                          
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <Avatar 
                                sx={{ 
                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                  color: theme.palette.primary.main,
                                  width: 40,
                                  height: 40,
                                }}
                              >
                                <People fontSize="small" />
                              </Avatar>
                              <Box>
                                <Typography variant="body2" color="text.secondary">Team Size</Typography>
                                <Typography variant="body1" fontWeight="medium">{project.teamSize}</Typography>
                              </Box>
                            </Box>
                          </Grid>
                          
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <Avatar 
                                sx={{ 
                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                  color: theme.palette.primary.main,
                                  width: 40,
                                  height: 40,
                                }}
                              >
                                <Code fontSize="small" />
                              </Avatar>
                              <Box>
                                <Typography variant="body2" color="text.secondary">Role</Typography>
                                <Typography variant="body1" fontWeight="medium">{project.role}</Typography>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                    
                    <Divider sx={{ mt: 2, mb: 3 }} />
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                      <Typography variant="subtitle2" fontWeight="bold" sx={{ mr: 1 }}>
                        Technologies:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                      {project.technologies?.map((tech, index) => {
  let techIcon = undefined;
  
  // Handle tech icons whether they're an array or an object
  if (project.technologyIcons && !Array.isArray(project.technologyIcons)) {
    techIcon = (project.technologyIcons as Record<string, string>)[tech];
  }
  
  return (
    <Tooltip key={index} title={tech}>
      <Chip
        icon={techIcon ? (
          <Box component="img" src={techIcon} sx={{ width: 20, height: 20 }} />
        ) : undefined}
        label={tech}
        variant="outlined"
        size="small"
        sx={{
          borderRadius: '12px',
          borderColor: theme.palette.divider,
          '&:hover': {
            borderColor: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
          },
        }}
      />
    </Tooltip>
  );
})}
                      </Box>
                    </Box>
                  </Box>
                  
                  {/* Decorative background elements */}
                  <Box 
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '100%',
                      height: '100%',
                      zIndex: 0,
                      opacity: 0.05,
                      pointerEvents: 'none',
                      background: `radial-gradient(circle at 80% 20%, ${theme.palette.primary.main}, transparent 60%)`,
                    }}
                  />
                </GlassCard>
              </motion.div>
              
              {/* Content Navigation for mobile/tablet */}
              {isMobile && (
                <Box sx={{ width: '100%', mb: 4 }}>
                  <Tabs 
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                      '& .MuiTabs-indicator': {
                        height: 3,
                        borderRadius: '3px 3px 0 0',
                      },
                      '& .MuiTab-root': {
                        textTransform: 'none',
                        minWidth: 'auto',
                        px: 3,
                        fontWeight: 'medium',
                        fontSize: '0.9rem',
                      },
                    }}
                  >
                    <Tab 
                      icon={<LightbulbOutlined sx={{ mb: 0.5 }} />} 
                      label="Challenge" 
                      iconPosition="start" 
                    />
                    <Tab 
                      icon={<Timeline sx={{ mb: 0.5 }} />} 
                      label="Approach" 
                      iconPosition="start" 
                    />
                    <Tab 
                      icon={<EmojiEvents sx={{ mb: 0.5 }} />} 
                      label="Achievements" 
                      iconPosition="start" 
                    />
                    <Tab 
                      icon={<School sx={{ mb: 0.5 }} />} 
                      label="Lessons" 
                      iconPosition="start" 
                    />
                  </Tabs>
                </Box>
              )}
              
              {/* Main Content Grid */}
              <Grid 
                container 
                spacing={{ xs: 3, md: 5 }} 
                sx={{ mb: 6 }}
              >
                {/* Main Content Column */}
                <Grid item xs={12} md={8}>
                  {isMobile ? (
                    <>
                      <TabPanel value={activeTab} index={0}>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Box>
                            <Typography variant="h5" component="h2" sx={sectionHeadingStyle}>
                              <LightbulbOutlined fontSize="small" />
                              The Challenge
                            </Typography>
                            <ChallengeSection challenge={project.challenges} />
                          </Box>

                          <Box sx={{ mt: 4 }}>
                            <Typography variant="h5" component="h2" sx={sectionHeadingStyle}>
                              <EmojiEvents fontSize="small" />
                              Key Performance Metrics
                            </Typography>
                            <MetricTilesContainer metrics={project.metrics} />
                          </Box>
                        </motion.div>
                      </TabPanel>
                      
                      <TabPanel value={activeTab} index={1}>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Box>
                            <Typography variant="h5" component="h2" sx={sectionHeadingStyle}>
                              <Timeline fontSize="small" />
                              Our Approach
                            </Typography>
                            <Box ref={timelineRef}>
                              <ApproachTimeline steps={project.approach} />
                            </Box>
                          </Box>
                        </motion.div>
                      </TabPanel>
                      
                      <TabPanel value={activeTab} index={2}>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Box>
                            <Typography variant="h5" component="h2" sx={sectionHeadingStyle}>
                              <EmojiEvents fontSize="small" />
                              Key Achievements
                            </Typography>
                            <AchievementsList achievements={project.achievements} />
                          </Box>
                        </motion.div>
                      </TabPanel>
                      
                      <TabPanel value={activeTab} index={3}>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Box>
                            <Typography variant="h5" component="h2" sx={sectionHeadingStyle}>
                              <School fontSize="small" />
                              Lessons Learned
                            </Typography>
                            <LessonsLearned lesson={project.lessonsLearned} />
                          </Box>
                        </motion.div>
                      </TabPanel>
                    </>
                  ) : (
                    // Desktop view - all sections visible
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {/* Challenge Section */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                      >
                        <GlassCard sx={{ p: 4, borderRadius: 3 }}>
                          <Typography variant="h5" component="h2" sx={sectionHeadingStyle}>
                            <LightbulbOutlined />
                            The Challenge
                          </Typography>
                          <ChallengeSection challenge={project.challenges} />
                        </GlassCard>
                      </motion.div>
                      
                      {/* Metrics Section */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <GlassCard sx={{ p: 4, borderRadius: 3 }}>
                          <Typography variant="h5" component="h2" sx={sectionHeadingStyle}>
                            <EmojiEvents />
                            Key Performance Metrics
                          </Typography>
                          <MetricTilesContainer metrics={project.metrics} />
                        </GlassCard>
                      </motion.div>
                      
                      {/* Approach Timeline */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        <GlassCard sx={{ p: 4, borderRadius: 3 }}>
                          <Typography variant="h5" component="h2" sx={sectionHeadingStyle}>
                            <Timeline />
                            Our Approach
                          </Typography>
                          <Box 
                            ref={timelineRef}
                            sx={{
                              width: '100%',
                              overflowX: 'auto',
                              pb: 2,
                              '&::-webkit-scrollbar': {
                                height: '8px',
                              },
                              '&::-webkit-scrollbar-track': {
                                background: alpha(theme.palette.divider, 0.1),
                                borderRadius: '4px',
                              },
                              '&::-webkit-scrollbar-thumb': {
                                background: alpha(theme.palette.primary.main, 0.2),
                                borderRadius: '4px',
                                '&:hover': {
                                  background: alpha(theme.palette.primary.main, 0.4),
                                },
                              },
                            }}
                          >
                            <ApproachTimeline steps={project.approach} />
                          </Box>
                        </GlassCard>
                      </motion.div>
                      
                      {/* Achievements Section */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        <GlassCard sx={{ p: 4, borderRadius: 3 }}>
                          <Typography variant="h5" component="h2" sx={sectionHeadingStyle}>
                            <EmojiEvents />
                            Key Achievements
                          </Typography>
                          <AchievementsList achievements={project.achievements} />
                        </GlassCard>
                      </motion.div>
                      
                      {/* Lessons Learned Section */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        <GlassCard sx={{ p: 4, borderRadius: 3 }}>
                          <Typography variant="h5" component="h2" sx={sectionHeadingStyle}>
                            <School />
                            Lessons Learned
                          </Typography>
                          <LessonsLearned lesson={project.lessonsLearned} />
                        </GlassCard>
                      </motion.div>
                    </Box>
                  )}
                </Grid>
                
                {/* Sidebar Content Column */}
                <Grid item xs={12} md={4}>
                  <Box sx={{ position: 'sticky', top: 24 }}>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <QuickFacts
                        teamSize={project.teamSize}
                        timeline={project.timeline}
                        technologies={project.technologies}
                        technologyIcons={project.technologyIcons}
                        role={project.role}
                        clientName={project.clientName}
                      />
                    </motion.div>
                    
                    {/* Project Navigation */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                          Other Projects
                        </Typography>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          {prevProject && (
                            <GlassCard
                              sx={{
                                p: 2,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  transform: 'translateX(-8px)',
                                  boxShadow: theme.shadows[4],
                                  background: alpha(theme.palette.background.paper, 0.9),
                                },
                              }}
                              onClick={() => handleNavigateTo(prevProject.id)}
                            >
                              <ChevronLeft sx={{ color: theme.palette.primary.main }} />
                              <Box sx={{ ml: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                  Previous Project
                                </Typography>
                                <Typography variant="subtitle2" fontWeight="medium">
                                  {prevProject.name}
                                </Typography>
                              </Box>
                            </GlassCard>
                          )}
                          
                          {nextProject && (
                            <GlassCard
                              sx={{
                                p: 2,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  transform: 'translateX(8px)',
                                  boxShadow: theme.shadows[4],
                                  background: alpha(theme.palette.background.paper, 0.9),
                                },
                              }}
                              onClick={() => handleNavigateTo(nextProject.id)}
                            >
                              <Box sx={{ mr: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                  Next Project
                                </Typography>
                                <Typography variant="subtitle2" fontWeight="medium">
                                  {nextProject.name}
                                </Typography>
                              </Box>
                              <ChevronRight sx={{ color: theme.palette.primary.main }} />
                            </GlassCard>
                          )}
                        </Box>
                      </Box>
                    </motion.div>
                  </Box>
                </Grid>
              </Grid>
            </Container>
            
            {/* Project image backdrop */}
            <Backdrop
              sx={{ 
                color: '#fff',
                zIndex: theme.zIndex.drawer + 1,
                backdropFilter: 'blur(8px)',
                backgroundColor: alpha('#000', 0.85),
              }}
              open={isImageOpen}
              onClick={() => setIsImageOpen(false)}
            >
              <Box
                sx={{
                  position: 'relative',
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: theme.shadows[10],
                }}
              >
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    backgroundColor: alpha('#000', 0.6),
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: alpha('#000', 0.8),
                    },
                    zIndex: 2,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsImageOpen(false);
                  }}
                >
                  <MoreVert />
                </IconButton>
                <Box
                  component="img"
                  src={ "/images/project-placeholder.jpg"}
                  alt={project.name}
                  sx={{
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </Backdrop>
            
            {/* Background decorative elements */}
            <Box 
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                opacity: 0.05,
                pointerEvents: 'none',
                background: `
                  radial-gradient(circle at 10% 10%, ${theme.palette.primary.light}, transparent 40%),
                  radial-gradient(circle at 90% 90%, ${theme.palette.secondary.main}, transparent 40%)
                `,
              }}
            />
          </Box>
        </motion.div>
      </AnimatePresence>
    </ConsistentPageLayout>
  );
};

export default ProjectDetails;