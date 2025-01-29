import { Box, Typography, Grid, Stack, CircularProgress, Chip, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { styled, alpha } from '@mui/material/styles';


// theme/branding.ts
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
  TEXT_SHADOW: '0 2px 4px rgba(0,0,0,0.3)'
};

export const GlassCard = styled(Box)(({ theme }) => ({
  background: colors.GLASS_BACKGROUND,
  backdropFilter: 'blur(24px)',
  borderRadius: colors.BORDER_RADIUS,
  border: `1px solid ${alpha(colors.NEUTRAL_LIGHT, 0.1)}`,
  boxShadow: `0 12px 24px ${alpha(colors.PRIMARY_DARK, 0.3)}`,
  padding: theme.spacing(4),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 16px 32px ${alpha(colors.PRIMARY_DARK, 0.4)}`
  }
}));

export const ComparisonCard = ({ before, after }: any) => (
  <GlassCard>
    <Typography variant="h5" sx={{ 
      mb: 3, 
      background: colors.TITLE_GRADIENT,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontWeight: 700
    }}>
      Transformation Journey
    </Typography>
    
    <Box position="relative" height={160} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div className="before-metric" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <CircularProgress
          variant="determinate"
          value={before.percentage}
          size={120}
          thickness={3}
          sx={{
            color: '#EF4444',
            position: 'absolute',
            left: 0,
            transform: 'rotate(-90deg)'
          }}
        />
      </motion.div>

      <motion.div className="after-metric" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <CircularProgress
          variant="determinate"
          value={after.percentage}
          size={120}
          thickness={3}
          sx={{
            color: colors.ACCENT_SECONDARY,
            position: 'absolute',
            right: 0,
            transform: 'rotate(90deg)'
          }}
        />
      </motion.div>

      <Box sx={{ 
        position: 'relative', 
        zIndex: 1, 
        textAlign: 'center',
        background: alpha(colors.NEUTRAL_LIGHT, 0.05),
        borderRadius: '50%',
        p: 2
      }}>
        <ArrowRight size={48} color={colors.HIGHLIGHT_COLOR} />
      </Box>
    </Box>

    <Grid container spacing={3} sx={{ mt: 2 }}>
      <Grid item xs={6}>
        <Box sx={{ pr: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#EF4444', mb: 1 }}>
            Before
          </Typography>
          <Typography variant="body2" sx={{ color: colors.NEUTRAL_LIGHT, opacity: 0.9 }}>
            {before.description}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ pl: 2 }}>
          <Typography variant="subtitle2" sx={{ color: colors.ACCENT_SECONDARY, mb: 1 }}>
            After
          </Typography>
          <Typography variant="body2" sx={{ color: colors.NEUTRAL_LIGHT, opacity: 0.9 }}>
            {after.description}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </GlassCard>
);

export const MetricTiles = ({ metrics }: any) => (
  <Grid container spacing={3}>
    {metrics.map((metric: any, index: number) => (
      <Grid item xs={12} sm={6} key={index}>
        <motion.div whileHover={{ scale: 1.02 }}>
          <GlassCard>
            <Stack direction="row" spacing={3} alignItems="center">
              <Box sx={{ position: 'relative' }}>
                <CircularProgress
                  variant="determinate"
                  value={metric.value}
                  size={72}
                  thickness={3}
                  sx={{
                    color: index % 2 ? colors.HIGHLIGHT_COLOR : colors.ACCENT_SECONDARY,
                    transform: 'rotate(-90deg)'
                  }}
                />
                <Typography variant="h6" sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: colors.NEUTRAL_LIGHT
                }}>
                  {metric.value}%
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ 
                  color: colors.NEUTRAL_LIGHT,
                  fontWeight: 600,
                  mb: 0.5
                }}>
                  {metric.label}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: alpha(colors.NEUTRAL_LIGHT, 0.8),
                  lineHeight: 1.4
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

export const IconList = ({ items }: any) => (
  <Stack spacing={2.5}>
    {items.map((item: string, index: number) => (
      <Stack key={index} direction="row" spacing={2} alignItems="flex-start">
        <CheckCircle size={24} color={colors.HIGHLIGHT_COLOR} style={{ 
          flexShrink: 0,
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' 
        }} />
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
// RadarChart component placeholder (would need implementation)
export const RadarChart = () => <div />;