import { Box, Typography, Grid, Stack, CircularProgress, useTheme } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { styled, alpha } from '@mui/material/styles';

// Enhanced theme/branding.ts
export const colors = {
  PRIMARY_DARK: '#0F172A',
  SECONDARY_DARK: '#1E293B',
  NEUTRAL_LIGHT: '#F1F5F9',
  HIGHLIGHT_COLOR: '#F59E0B',
  ACCENT_SECONDARY: '#2DD4BF',
  TITLE_GRADIENT: 'linear-gradient(45deg, #F59E0B 0%, #2DD4BF 100%)',
  GLASS_BACKGROUND: `linear-gradient(145deg, ${alpha('#0F172A', 0.96)} 0%, ${alpha('#1E293B', 0.92)} 100%)`,
  SECTION_SPACING: 8,
  BORDER_RADIUS: '16px',
  TEXT_SHADOW: '0 2px 4px rgba(0,0,0,0.3)',
  GLOW_SHADOW: `0 0 20px ${alpha('#F59E0B', 0.3)}`
};

export const GlassCard = styled(Box)(({ theme }) => ({
  background: colors.GLASS_BACKGROUND,
  backdropFilter: 'blur(24px)',
  borderRadius: colors.BORDER_RADIUS,
  border: `1px solid ${alpha(colors.NEUTRAL_LIGHT, 0.1)}`,
  boxShadow: `0 12px 24px ${alpha(colors.PRIMARY_DARK, 0.3)}`,
  padding: theme.spacing(4),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `${colors.GLOW_SHADOW}, 0 16px 32px ${alpha(colors.PRIMARY_DARK, 0.4)}`
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: colors.BORDER_RADIUS,
    border: `1px solid transparent`,
    background: `linear-gradient(145deg, ${alpha(colors.HIGHLIGHT_COLOR, 0.2)} 0%, ${alpha(colors.ACCENT_SECONDARY, 0.2)} 100%)`,
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude'
  }
}));

interface ComparisonData {
  percentage: number;
  description: string;
}

interface ComparisonCardProps {
  before: ComparisonData;
  after: ComparisonData;
}

export const ComparisonCard = ({ before, after }: ComparisonCardProps) => {
  const controls = useAnimation();

  return (
    <GlassCard
      component={motion.div}
      whileHover="hover"
      onHoverStart={() => controls.start('hover')}
      sx={{ cursor: 'pointer' }}
    >
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 3, 
          background: colors.TITLE_GRADIENT,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 700,
          textShadow: colors.TEXT_SHADOW,
          position: 'relative',
          display: 'inline-block',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -4,
            left: 0,
            width: '100%',
            height: '2px',
            background: colors.TITLE_GRADIENT
          }
        }}
      >
        Transformation Journey
      </Typography>
      
      <Box position="relative" height={160} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <CircularProgress
            variant="determinate"
            value={before.percentage}
            size={120}
            thickness={3}
            sx={{
              color: '#EF4444',
              filter: 'drop-shadow(0 4px 12px rgba(239,68,68,0.3))',
              position: 'absolute',
              left: 0,
              transform: 'rotate(-90deg)'
            }}
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CircularProgress
            variant="determinate"
            value={after.percentage}
            size={120}
            thickness={3}
            sx={{
              color: colors.ACCENT_SECONDARY,
              filter: 'drop-shadow(0 4px 12px rgba(45,212,191,0.3))',
              position: 'absolute',
              right: 0,
              transform: 'rotate(90deg)'
            }}
          />
        </motion.div>

        <Box 
          component={motion.div}
          animate={controls}
          variants={{
            hover: { rotate: 360, scale: 1.1 }
          }}
          sx={{ 
            position: 'relative', 
            zIndex: 1, 
            textAlign: 'center',
            background: alpha(colors.NEUTRAL_LIGHT, 0.05),
            borderRadius: '50%',
            p: 2,
            backdropFilter: 'blur(8px)'
          }}
        >
          <ArrowRight size={48} color={colors.HIGHLIGHT_COLOR} />
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={6}>
          <Box sx={{ pr: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                component="span"
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#EF4444',
                  boxShadow: '0 0 8px rgba(239,68,68,0.5)'
                }}
              />
              <Typography variant="subtitle2" sx={{ color: '#EF4444', mb: 1, fontWeight: 700 }}>
                Before
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ 
              color: colors.NEUTRAL_LIGHT,
              opacity: 0.9,
              lineHeight: 1.6,
              position: 'relative',
              pl: 2,
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 4,
                bottom: 4,
                width: '2px',
                background: '#EF4444',
                borderRadius: 2
              }
            }}>
              {before.description}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ pl: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                component="span"
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: colors.ACCENT_SECONDARY,
                  boxShadow: `0 0 8px ${alpha(colors.ACCENT_SECONDARY, 0.5)}`
                }}
              />
              <Typography variant="subtitle2" sx={{ color: colors.ACCENT_SECONDARY, mb: 1, fontWeight: 700 }}>
                After
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ 
              color: colors.NEUTRAL_LIGHT,
              opacity: 0.9,
              lineHeight: 1.6,
              position: 'relative',
              pl: 2,
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 4,
                bottom: 4,
                width: '2px',
                background: colors.ACCENT_SECONDARY,
                borderRadius: 2
              }
            }}>
              {after.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </GlassCard>
  );
};

interface Metric {
  value: number;
  label: string;
  description: string;
}

interface MetricTilesProps {
  metrics: Metric[];
}

export const MetricTiles = ({ metrics }: MetricTilesProps) => (
  <Grid container spacing={3}>
    {metrics.map((metric: Metric, index: number) => (
      <Grid item xs={12} sm={6} key={index}>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <GlassCard sx={{ position: 'relative' }}>
            <Stack direction="row" spacing={3} alignItems="center">
              <Box sx={{ position: 'relative' }}>
                <CircularProgress
                  variant="determinate"
                  value={metric.value}
                  size={72}
                  thickness={3}
                  sx={{
                    color: index % 2 ? colors.HIGHLIGHT_COLOR : colors.ACCENT_SECONDARY,
                    transform: 'rotate(-90deg)',
                    filter: `drop-shadow(0 4px 8px ${alpha(index % 2 ? colors.HIGHLIGHT_COLOR : colors.ACCENT_SECONDARY, 0.2)})`
                  }}
                />
                <Typography variant="h6" sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: colors.NEUTRAL_LIGHT,
                  fontWeight: 700,
                  textShadow: colors.TEXT_SHADOW
                }}>
                  {metric.value}%
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ 
                  color: colors.NEUTRAL_LIGHT,
                  fontWeight: 700,
                  mb: 0.5,
                  textShadow: colors.TEXT_SHADOW
                }}>
                  {metric.label}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: alpha(colors.NEUTRAL_LIGHT, 0.9),
                  lineHeight: 1.6,
                  maxWidth: '75%'
                }}>
                  {metric.description}
                </Typography>
              </Box>
            </Stack>
          </GlassCard>
        </motion.div>
      </Grid>
    ))}
  </Grid>
);

interface IconListProps {
  items: string[];
}

export const IconList = ({ items }: IconListProps) => (
  <Stack spacing={2.5}>
    {items.map((item: string, index: number) => (
      <Stack 
        key={index} 
        direction="row" 
        spacing={2} 
        alignItems="flex-start"
        component={motion.div}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        sx={{
          p: 2,
          borderRadius: '8px',
          background: alpha(colors.NEUTRAL_LIGHT, 0.05),
          transition: 'all 0.2s ease',
          '&:hover': {
            background: alpha(colors.NEUTRAL_LIGHT, 0.1),
            transform: 'translateX(8px)'
          }
        }}
      >
        <CheckCircle 
          size={24} 
          color={colors.HIGHLIGHT_COLOR} 
          style={{ 
            flexShrink: 0,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' 
          }} 
        />
        <Typography variant="body1" sx={{ 
          color: colors.NEUTRAL_LIGHT,
          lineHeight: 1.6,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: -4,
            left: 0,
            width: '40%',
            height: '1px',
            background: alpha(colors.HIGHLIGHT_COLOR, 0.3)
          }
        }}>
          {item}
        </Typography>
      </Stack>
    ))}
  </Stack>
);