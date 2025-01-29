import { Box, Typography, Grid, Stack, CircularProgress, Chip, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { PRIMARY_DARK, GOLD_ACCENT, SECONDARY_DARK } from '../theme/branding';
import { styled, alpha } from '@mui/material/styles';
import { ArrowRight, CheckCircle, BarChart, TrendingUp } from 'lucide-react';

export const GlassCard = styled(Box)(({ theme }) => ({
  background: `linear-gradient(145deg, ${alpha(theme.palette.common.white, 0.05)}, ${alpha(theme.palette.common.black, 0.3)})`,
  backdropFilter: 'blur(24px)',
  borderRadius: '24px',
  border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
  boxShadow: `0 8px 32px ${alpha(PRIMARY_DARK, 0.2)}`,
  padding: theme.spacing(3),
}));

export const ComparisonCard = ({ before, after, sx }: any) => (
  <GlassCard sx={sx}>
    <Typography variant="h6" sx={{ mb: 2, color: GOLD_ACCENT }}>Transformation Journey</Typography>
    <Box position="relative" height={120}>
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ position: 'absolute', left: 0 }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress
            variant="determinate"
            value={100}
            size={80}
            thickness={4}
            sx={{ color: alpha('#ff6b6b', 0.2), position: 'absolute' }}
          />
          <CircularProgress
            variant="determinate"
            value={before.percentage}
            size={80}
            thickness={4}
            sx={{ color: '#ff6b6b' }}
          />
          <Typography variant="h5" sx={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#ff6b6b'
          }}>
            {before.percentage}%
          </Typography>
        </Box>
      </motion.div>

      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ position: 'absolute', right: 0 }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress
            variant="determinate"
            value={100}
            size={80}
            thickness={4}
            sx={{ color: alpha('#69db7c', 0.2), position: 'absolute' }}
          />
          <CircularProgress
            variant="determinate"
            value={after.percentage}
            size={80}
            thickness={4}
            sx={{ color: '#69db7c' }}
          />
          <Typography variant="h5" sx={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#69db7c'
          }}>
            {after.percentage}%
          </Typography>
        </Box>
      </motion.div>

      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        style={{ 
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <ArrowRight size={32} color={GOLD_ACCENT} />
      </motion.div>
    </Box>
    <Grid container spacing={2} sx={{ mt: 4 }}>
      <Grid item xs={6}>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          {before.description}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          {after.description}
        </Typography>
      </Grid>
    </Grid>
  </GlassCard>
);

export const MetricTiles = ({ metrics }: any) => (
  <Grid container spacing={2}>
    {metrics.map((metric: any, index: number) => (
      <Grid item xs={12} sm={6} key={index}>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <GlassCard sx={{ 
            height: '100%',
            background: `linear-gradient(45deg, ${alpha(PRIMARY_DARK, 0.5)}, ${alpha(SECONDARY_DARK, 0.3)})`
          }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{
                position: 'relative',
                width: 60,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CircularProgress
                  variant="determinate"
                  value={metric.value}
                  size={60}
                  thickness={4}
                  sx={{ 
                    color: GOLD_ACCENT,
                    position: 'absolute',
                    transform: 'rotate(90deg)'
                  }}
                />
                <Box sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  bgcolor: alpha(GOLD_ACCENT, 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                
                </Box>
              </Box>
              <Box>
                <Typography variant="h5" sx={{ color: GOLD_ACCENT }}>
                  {metric.value}%
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  {metric.label}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
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
  <Stack spacing={2}>
    {items.map((item: string, index: number) => (
      <Stack key={index} direction="row" spacing={2} alignItems="flex-start">
        <CheckCircle size={20} color={GOLD_ACCENT} />
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
          {item}
        </Typography>
      </Stack>
    ))}
  </Stack>
);

// RadarChart component placeholder (would need implementation)
export const RadarChart = () => <div />;