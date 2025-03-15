'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMemo, useRef, useState, useEffect, ReactNode } from 'react';
import {
  Box, Typography, Container, CircularProgress, Grid, Divider, 
  Chip, Avatar, Tooltip, Backdrop, Button, IconButton, Tabs, Tab,
  useTheme, useMediaQuery, alpha
} from '@mui/material';
import {
  ArrowBack, CalendarMonth, People, Code, BusinessCenter, ChevronRight,
  ChevronLeft, Share, BookmarkAdd, Download, MoreVert, LightbulbOutlined,
  Timeline, EmojiEvents, School
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { cvProjects } from '@/data/cvProjects';
import ConsistentPageLayout from '@/components/Shared/ConsistentPageLayout';
import QuickFacts from '@/components/Project/QuickFacts';
import { LessonsLearned } from '@/components/Project/LessonsLearned';
import { ChallengeSection } from '@/components/Project/ChallengeSection';
import { ApproachTimeline } from '@/components/Project/ApproachTimeline';
import { MetricTilesContainer } from '@/components/Project/MetricsSection';
import { AchievementsList } from '@/components/Project/AchievementsList';
import { GlassCard } from '@/components/Theme/GlassCard';

// Component interfaces
interface TabPanelProps { children: ReactNode; value: number; index: number; }
interface ProjectSectionProps { title: string; icon: ReactNode; children: ReactNode; delay?: number; }
interface Project {
  id: string; 
  name: string; 
  description: string; 
  clientName: string;
  timeline: string; 
  teamSize: string; 
  role: string; 
  tags?: string[];
  technologies?: string[]; 
  technologyIcons?: Record<string, string>;
  challenges: any; 
  metrics: any; 
  approach: any[];
  achievements: any[]; 
  lessonsLearned: any;
}

// TabPanel component 
const TabPanel = ({ children, value, index }: TabPanelProps) => (
  <div role="tabpanel" hidden={value !== index} id={`project-tabpanel-${index}`} aria-labelledby={`project-tab-${index}`}>
    {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
  </div>
);

// Section content component
const ProjectSection = ({ title, icon, children, delay = 0 }: ProjectSectionProps) => {
  const theme = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <GlassCard sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" component="h2" sx={{ 
          fontWeight: 'bold', color: theme.palette.primary.main, 
          display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, mt: 1 
        }}>
          {icon} {title}
        </Typography>
        {children}
      </GlassCard>
    </motion.div>
  );
};

// Loading screen component
const LoadingScreen = () => {
  const loadingAnimation = { initial: { opacity: 0 }, animate: { opacity: 1 } };
  return (
    <Container sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <CircularProgress size={60} thickness={4} color="primary" />
      </motion.div>
      <motion.div {...loadingAnimation} transition={{ duration: 0.5, delay: 0.2 }}>
        <Typography variant="h4" sx={{ mt: 2 }}>Loading Project...</Typography>
      </motion.div>
    </Container>
  );
};

// Mobile Section Header
const SectionHeader = ({ icon, title }: { icon: ReactNode, title: string }) => {
  const theme = useTheme();
  return (
    <Typography variant="h5" component="h2" sx={{ 
      fontWeight: 'bold', color: theme.palette.primary.main, 
      display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, mt: 1 
    }}>
      {icon} {title}
    </Typography>
  );
};

export default function ProjectDetails() {
  const theme = useTheme();
  const params = useParams();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const projectId = params.id as string;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isImageOpen, setIsImageOpen] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Find current, previous and next projects
  const { project, prevProject, nextProject } = useMemo(() => {
    const current = cvProjects.find(p => p.id === projectId);
    if (!current) return { project: null, prevProject: null, nextProject: null };
    
    const projectIndex = cvProjects.findIndex(p => p.id === projectId);
    const prev = projectIndex > 0 ? cvProjects[projectIndex - 1] : null;
    const next = projectIndex < cvProjects.length - 1 ? cvProjects[projectIndex + 1] : null;
    
    return { project: current, prevProject: prev, nextProject: next };
  }, [projectId]);

  // Setup effects
  useEffect(() => {
    if (project) setIsLoading(false);

    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(docHeight === 0 ? 0 : scrollTop / docHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [project]);

  // Handler functions
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => setActiveTab(newValue);
  const handleNavigateTo = (id: string | null) => id && router.push(`/projects/${id}`);

  // Loading state
  if (isLoading || !project) return <LoadingScreen />;

  // Tab items for mobile view
  const tabItems = [
    { icon: <LightbulbOutlined sx={{ mb: 0.5 }} />, label: 'Challenge' },
    { icon: <Timeline sx={{ mb: 0.5 }} />, label: 'Approach' },
    { icon: <EmojiEvents sx={{ mb: 0.5 }} />, label: 'Achievements' },
    { icon: <School sx={{ mb: 0.5 }} />, label: 'Lessons' }
  ];

  // Project meta items
  const metaItems = [
    { icon: <BusinessCenter fontSize="small" />, label: 'Client', value: project.clientName },
    { icon: <CalendarMonth fontSize="small" />, label: 'Timeline', value: project.timeline },
    { icon: <People fontSize="small" />, label: 'Team Size', value: project.teamSize },
    { icon: <Code fontSize="small" />, label: 'Role', value: project.role }
  ];

  // Action buttons
  const actionButtons = [
    { icon: <BookmarkAdd />, tooltip: 'Save Project' },
    { icon: <Share />, tooltip: 'Share' },
    { icon: <Download />, tooltip: 'Download PDF' }
  ];

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
          <Box component="div" ref={containerRef} sx={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
            {/* Progress indicator */}
            <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, height: '4px', zIndex: 1100, background: theme.palette.background.paper }}>
              <Box sx={{ height: '100%', width: `${scrollProgress * 100}%`, background: theme.palette.primary.main, transition: 'width 0.1s' }} />
            </Box>

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, my: 4 }}>
              {/* Back button and action buttons */}
              <Box sx={{ position: 'relative', mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ArrowBack />}
                    onClick={() => router.back()}
                    sx={{ borderRadius: '24px', padding: '8px 24px' }}
                  >
                    All Projects
                  </Button>
                </motion.div>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  {actionButtons.map((item, idx) => (
                    <Tooltip key={idx} title={item.tooltip}>
                      <IconButton color="primary" sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
                        {item.icon}
                      </IconButton>
                    </Tooltip>
                  ))}
                </Box>
              </Box>
              
              {/* Project Header Card */}
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
                <GlassCard
                  sx={{
                    mb: 6, position: 'relative', p: { xs: 3, md: 5 }, borderRadius: 4,
                    boxShadow: theme.shadows[4], background: alpha(theme.palette.background.paper, 0.8),
                    backdropFilter: 'blur(10px)', overflow: 'hidden',
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
                      <Box sx={{ width: { xs: '100%', md: '30%' }, height: { xs: '200px', md: '250px' }, borderRadius: 3, overflow: 'hidden', position: 'relative', boxShadow: theme.shadows[3] }} />
                      
                      <Box sx={{ flex: 1 }}>
                        {/* Tags */}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          {project.tags?.map((tag, index) => (
                            <Chip 
                              key={index} 
                              label={tag} 
                              size="small" 
                              sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, fontWeight: 'medium' }} 
                            />
                          ))}
                        </Box>
                        
                        {/* Project title and description */}
                        <Typography 
                          variant="h3" 
                          component="h1" 
                          sx={{ 
                            fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700, mb: 2,
                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                          }}
                        >
                          {project.name}
                        </Typography>
                        
                        <Typography variant="subtitle1" sx={{ mb: 3, color: theme.palette.text.secondary, lineHeight: 1.6 }}>
                          {project.description}
                        </Typography>
                        
                        {/* Project meta info */}
                        <Grid container spacing={3}>
                          {metaItems.map((item, idx) => (
                            <Grid item xs={12} sm={6} key={idx}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, width: 40, height: 40 }}>
                                  {item.icon}
                                </Avatar>
                                <Box>
                                  <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                                  <Typography variant="body1" fontWeight="medium">{item.value}</Typography>
                                </Box>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Box>
                    
                    <Divider sx={{ mt: 2, mb: 3 }} />
                    
                    {/* Technologies */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                      <Typography variant="subtitle2" fontWeight="bold" sx={{ mr: 1 }}>Technologies:</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                        {project.technologies?.map((tech, index) => {
                          // Fixed TypeScript error by ensuring tech is used as a string key
                          const techIcon = project.technologyIcons && typeof project.technologyIcons === 'object' 
                            ? project.technologyIcons[tech as keyof typeof project.technologyIcons] 
                            : undefined;
                          
                          return (
                            <Tooltip key={index} title={tech}>
                              <Chip
                                icon={techIcon ? <Box component="img" src={techIcon} sx={{ width: 20, height: 20 }} /> : undefined}
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
                  
                  {/* Decorative background */}
                  <Box 
                    sx={{
                      position: 'absolute', top: 0, right: 0, width: '100%', height: '100%',
                      zIndex: 0, opacity: 0.05, pointerEvents: 'none',
                      background: `radial-gradient(circle at 80% 20%, ${theme.palette.primary.main}, transparent 60%)`,
                    }}
                  />
                </GlassCard>
              </motion.div>
              
              {/* Mobile Tabs */}
              {isMobile && (
                <Box sx={{ width: '100%', mb: 4 }}>
                  <Tabs 
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                      '& .MuiTabs-indicator': { height: 3, borderRadius: '3px 3px 0 0' },
                      '& .MuiTab-root': { textTransform: 'none', minWidth: 'auto', px: 3, fontWeight: 'medium', fontSize: '0.9rem' },
                    }}
                  >
                    {tabItems.map((tab, idx) => (
                      <Tab key={idx} icon={tab.icon} label={tab.label} iconPosition="start" />
                    ))}
                  </Tabs>
                </Box>
              )}
              
              {/* Main Content Grid */}
              <Grid container spacing={{ xs: 3, md: 5 }} sx={{ mb: 6 }}>
                {/* Main Content Column */}
                <Grid item xs={12} md={8}>
                  {isMobile ? (
                    // Mobile view with tabs
                    <>
                      <TabPanel value={activeTab} index={0}>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                          <Box>
                            <SectionHeader icon={<LightbulbOutlined fontSize="small" />} title="The Challenge" />
                            <ChallengeSection challenge={project.challenges} />
                          </Box>

                          <Box sx={{ mt: 4 }}>
                            <SectionHeader icon={<EmojiEvents fontSize="small" />} title="Key Performance Metrics" />
                            <MetricTilesContainer metrics={project.metrics} />
                          </Box>
                        </motion.div>
                      </TabPanel>
                      
                      <TabPanel value={activeTab} index={1}>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                          <Box>
                            <SectionHeader icon={<Timeline fontSize="small" />} title="Our Approach" />
                            <Box ref={timelineRef}>
                              <ApproachTimeline steps={project.approach} />
                            </Box>
                          </Box>
                        </motion.div>
                      </TabPanel>
                      
                      <TabPanel value={activeTab} index={2}>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                          <Box>
                            <SectionHeader icon={<EmojiEvents fontSize="small" />} title="Key Achievements" />
                            <AchievementsList achievements={project.achievements} />
                          </Box>
                        </motion.div>
                      </TabPanel>
                      
                      <TabPanel value={activeTab} index={3}>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                          <Box>
                            <SectionHeader icon={<School fontSize="small" />} title="Lessons Learned" />
                            <LessonsLearned lesson={project.lessonsLearned} />
                          </Box>
                        </motion.div>
                      </TabPanel>
                    </>
                  ) : (
                    // Desktop view - all sections visible
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <ProjectSection title="The Challenge" icon={<LightbulbOutlined />} delay={0.1}>
                        <ChallengeSection challenge={project.challenges} />
                      </ProjectSection>
                      
                      <ProjectSection title="Key Performance Metrics" icon={<EmojiEvents />} delay={0.2}>
                        <MetricTilesContainer metrics={project.metrics} />
                      </ProjectSection>
                      
                      <ProjectSection title="Our Approach" icon={<Timeline />} delay={0.3}>
                        <Box 
                          ref={timelineRef}
                          sx={{
                            width: '100%', overflowX: 'auto', pb: 2,
                            '&::-webkit-scrollbar': { height: '8px' },
                            '&::-webkit-scrollbar-track': { background: alpha(theme.palette.divider, 0.1), borderRadius: '4px' },
                            '&::-webkit-scrollbar-thumb': {
                              background: alpha(theme.palette.primary.main, 0.2), borderRadius: '4px',
                              '&:hover': { background: alpha(theme.palette.primary.main, 0.4) },
                            },
                          }}
                        >
                          <ApproachTimeline steps={project.approach} />
                        </Box>
                      </ProjectSection>
                      
                      <ProjectSection title="Key Achievements" icon={<EmojiEvents />} delay={0.4}>
                        <AchievementsList achievements={project.achievements} />
                      </ProjectSection>
                      
                      <ProjectSection title="Lessons Learned" icon={<School />} delay={0.5}>
                        <LessonsLearned lesson={project.lessonsLearned} />
                      </ProjectSection>
                    </Box>
                  )}
                </Grid>
                
                {/* Sidebar Column */}
                <Grid item xs={12} md={4}>
                  <Box sx={{ position: 'sticky', top: 24 }}>
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
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
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
                      <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Other Projects</Typography>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          {prevProject && (
                            <GlassCard
                              sx={{
                                p: 2, cursor: 'pointer', display: 'flex', alignItems: 'center',
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
                                <Typography variant="body2" color="text.secondary">Previous Project</Typography>
                                <Typography variant="subtitle2" fontWeight="medium">{prevProject.name}</Typography>
                              </Box>
                            </GlassCard>
                          )}
                          
                          {nextProject && (
                            <GlassCard
                              sx={{
                                p: 2, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
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
                                <Typography variant="body2" color="text.secondary">Next Project</Typography>
                                <Typography variant="subtitle2" fontWeight="medium">{nextProject.name}</Typography>
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
                color: '#fff', zIndex: theme.zIndex.drawer + 1,
                backdropFilter: 'blur(8px)', backgroundColor: alpha('#000', 0.85),
              }}
              open={isImageOpen}
              onClick={() => setIsImageOpen(false)}
            >
              <Box sx={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', borderRadius: 2, overflow: 'hidden', boxShadow: theme.shadows[10] }}>
                <IconButton
                  sx={{
                    position: 'absolute', top: 16, right: 16,
                    backgroundColor: alpha('#000', 0.6), color: '#fff',
                    '&:hover': { backgroundColor: alpha('#000', 0.8) },
                    zIndex: 2,
                  }}
                  onClick={(e) => { e.stopPropagation(); setIsImageOpen(false); }}
                >
                  <MoreVert />
                </IconButton>
                <Box
                  component="img"
                  src="/images/project-placeholder.jpg"
                  alt={project.name}
                  sx={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }}
                />
              </Box>
            </Backdrop>
            
            {/* Background decorative elements */}
            <Box 
              sx={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                zIndex: -1, opacity: 0.05, pointerEvents: 'none',
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
}