"use client"
import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { Menu, ChevronUp } from 'react-feather';

interface Section {
  id: string;
  text: string;
  element: HTMLElement;
}

interface UltimateScrollNavigationProps {
  showProgressIndicator?: boolean;
  showSectionMenu?: boolean;
  headings?: string[];
  primaryColor?: string;
  secondaryColor?: string;
  hideDelay?: number;
  showLabels?: boolean;
  enableSmartPositioning?: boolean;
}

const UltimateScrollNavigation: React.FC<UltimateScrollNavigationProps> = ({
  showProgressIndicator = true,
  showSectionMenu = true,
  headings = ['h1', 'h2', 'h3', '.section-heading'],
  primaryColor,
  secondaryColor,
  hideDelay = 2000,
  showLabels = true,
  enableSmartPositioning = true,
}) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<'left' | 'right'>('right');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Colors with fallbacks to theme
  const primary = primaryColor || theme.palette.primary.main;
  const secondary = secondaryColor || alpha(theme.palette.primary.light, 0.6);

  // Find all sections based on headings
  useEffect(() => {
    // Function to find all section elements in the document
    const findSections = () => {
      try {
        const selector = headings.join(', ');
        const headingElements = document.querySelectorAll(selector);
        
        const newSections: Section[] = [];
        headingElements.forEach((el) => {
          // Safety check that the element is valid
          if (el && el instanceof HTMLElement) {
            const id = el.id || `section-${newSections.length}`;
            // If element doesn't have an ID, assign one
            if (!el.id) {
              el.id = id;
            }
            
            newSections.push({
              id,
              text: el.textContent || id,
              element: el,
            });
          }
        });
        
        setSections(newSections);
      } catch (error) {
        console.error('Error finding sections:', error);
      }
    };
    
    // Delay finding sections to ensure the DOM is fully rendered
    const timer = setTimeout(findSections, 500);
    
    return () => clearTimeout(timer);
  }, [headings]);

  // Update scroll position and determine active section
  useEffect(() => {
    const handleScroll = () => {
      // Safely handle scrollTop
      let scrollTop = 0;
      try {
        scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      } catch (error) {
        console.error('Error accessing scrollTop:', error);
      }
      
      // Calculate document height safely
      let documentHeight = 0;
      try {
        documentHeight = Math.max(
          document.body ? document.body.scrollHeight || 0 : 0,
          document.documentElement ? document.documentElement.scrollHeight || 0 : 0,
          document.body ? document.body.offsetHeight || 0 : 0,
          document.documentElement ? document.documentElement.offsetHeight || 0 : 0,
          document.body ? document.body.clientHeight || 0 : 0,
          document.documentElement ? document.documentElement.clientHeight || 0 : 0
        );
      } catch (error) {
        console.error('Error calculating document height:', error);
      }
      
      const windowHeight = window.innerHeight;
      const scrollable = documentHeight - windowHeight;
      
      if (scrollable > 0) {
        const calculated = Math.min(Math.max(scrollTop / scrollable, 0), 1);
        setScrollProgress(calculated * 100);
      } else {
        setScrollProgress(100);
      }

      // Only show navigation after scrolling down a bit
      setVisible(scrollTop > 300);
      
      // Determine which section is in view
      if (sections.length > 0) {
        try {
          // Get vertical center of viewport
          const viewportCenter = scrollTop + (windowHeight / 2);
          
          // Find the section closest to the viewport center
          let closest = sections[0];
          let minDistance = Math.abs(closest.element.getBoundingClientRect().top + scrollTop - viewportCenter);
          
          sections.forEach(section => {
            if (section.element) {
              const rect = section.element.getBoundingClientRect();
              const sectionTop = rect.top + scrollTop;
              const distance = Math.abs(sectionTop - viewportCenter);
              
              if (distance < minDistance) {
                closest = section;
                minDistance = distance;
              }
            }
          });
          
          if (closest && closest.id !== activeSection) {
            setActiveSection(closest.id);
          }
        } catch (error) {
          console.error('Error determining active section:', error);
        }
      }
      
      // Auto-hide navigation after delay
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        setShowMenu(false);
      }, hideDelay);
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    // Determine optimal menu position based on viewport
    if (enableSmartPositioning) {
      try {
        const checkPosition = () => {
          const viewportWidth = window.innerWidth;
          setMenuPosition(viewportWidth > 768 && viewportWidth - scrollRef.current?.getBoundingClientRect().right! < 300 ? 'left' : 'right');
        };
        
        checkPosition();
        window.addEventListener('resize', checkPosition);
        return () => {
          window.removeEventListener('resize', checkPosition);
          window.removeEventListener('scroll', handleScroll);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
      } catch (error) {
        console.error('Error determining menu position:', error);
        setMenuPosition('right'); // Default fallback
      }
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [sections, activeSection, hideDelay, enableSmartPositioning]);

  // Scroll to section when clicked
  const scrollToSection = (id: string) => {
    try {
      const section = sections.find(s => s.id === id);
      if (section && section.element) {
        // Using the safer scrollIntoView method
        section.element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setShowMenu(false);
      }
    } catch (error) {
      console.error('Error scrolling to section:', error);
      // Fallback to standard anchor navigation
      try {
        window.location.href = `#${id}`;
      } catch (fallbackError) {
        console.error('Error with fallback navigation:', fallbackError);
      }
    }
  };

  // Scroll to top of page
  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error scrolling to top:', error);
      // Fallback
      try {
        window.scrollTo(0, 0);
      } catch (fallbackError) {
        console.error('Error with fallback scroll:', fallbackError);
      }
    }
  };

  // Toggle section menu
  const toggleMenu = () => {
    setShowMenu(prev => !prev);
    // Reset auto-hide timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (!showMenu) {
      timeoutRef.current = setTimeout(() => {
        setShowMenu(false);
      }, hideDelay);
    }
  };

  if (!visible) return null;

  return (
    <Box
      ref={scrollRef}
      sx={{
        position: 'fixed',
        bottom: { xs: 20, sm: 30 },
        right: { xs: 20, sm: 30 },
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      {/* Section Navigation Menu */}
      <AnimatePresence>
        {showMenu && showSectionMenu && sections.length > 0 && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: menuPosition === 'right' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: menuPosition === 'right' ? 20 : -20 }}
            transition={{ duration: 0.2 }}
            sx={{
              mb: 2,
              p: 1.5,
              maxWidth: { xs: 200, sm: 250 },
              maxHeight: '50vh',
              overflowY: 'auto',
              backgroundColor: alpha(theme.palette.background.paper, 0.9),
              borderRadius: 2,
              boxShadow: 3,
              backdropFilter: 'blur(8px)',
              position: 'relative',
              [menuPosition === 'right' ? 'right' : 'left']: 0,
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700, opacity: 0.7 }}>
              Page Sections
            </Typography>
            
            {sections.map((section) => (
              <Box
                key={section.id}
                component={motion.div}
                whileHover={{ x: 4 }}
                onClick={() => scrollToSection(section.id)}
                sx={{
                  py: 0.75,
                  px: 1,
                  borderRadius: 1,
                  cursor: 'pointer',
                  mb: 0.5,
                  backgroundColor: activeSection === section.id ? alpha(primary, 0.15) : 'transparent',
                  transition: 'background-color 0.2s ease',
                  '&:hover': {
                    backgroundColor: alpha(primary, 0.1),
                  },
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: activeSection === section.id ? 600 : 400,
                    color: activeSection === section.id ? primary : 'text.primary',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {section.text}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </AnimatePresence>
  
      {/* Controls */}
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        {/* Scroll to Top Button */}
        <Tooltip 
          title="Scroll to top" 
          placement="top" 
          TransitionComponent={Zoom} 
          arrow
        >
          <Box
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            sx={{
              width: { xs: 40, sm: 44 },
              height: { xs: 40, sm: 44 },
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: primary,
              boxShadow: 2,
              cursor: 'pointer',
              color: theme.palette.getContrastText(primary),
              '&::before': showProgressIndicator ? {
                content: '""',
                position: 'absolute',
                inset: '2px',
                borderRadius: '50%',
                border: '2px solid transparent',
                background: `conic-gradient(from 0deg, ${primary} ${scrollProgress}%, transparent 0%)`,
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), white calc(100% - 2px))',
              } : {},
            }}
          >
            <ChevronUp size={20} />
          </Box>
        </Tooltip>
  
        {/* Section Menu Toggle Button */}
        {showSectionMenu && sections.length > 0 && (
          <Tooltip
            title={showLabels ? (showMenu ? "Hide sections" : "Show sections") : ""}
            placement="top"
            TransitionComponent={Zoom}
            arrow
          >
            <Box
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              sx={{
                width: { xs: 40, sm: 44 },
                height: { xs: 40, sm: 44 },
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: showMenu ? primary : secondary,
                boxShadow: 2,
                cursor: 'pointer',
                color: theme.palette.getContrastText(showMenu ? primary : secondary),
              }}
            >
              <Menu size={20} />
            </Box>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default UltimateScrollNavigation;