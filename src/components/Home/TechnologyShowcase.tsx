import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  alpha,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  FaPython,
  FaReact,
  FaNodeJs,
  FaAws,
  FaDocker,
  FaJava,
  FaMicrosoft,
  FaBrain,
  FaDatabase,
  FaGoogle,
  FaLinux,
} from "react-icons/fa";
import { PRIMARY_DARK, SECONDARY_DARK } from "../../theme/palette";

// Technology list with icons
const techIcons = [
  { id: "python", title: "Python", icon: <FaPython />, color: "#3776AB" },
  { id: "react", title: "React", icon: <FaReact />, color: "#61DAFB" },
  { id: "nodejs", title: "Node.js", icon: <FaNodeJs />, color: "#68A063" },
  { id: "aws", title: "AWS", icon: <FaAws />, color: "#FF9900" },
  { id: "docker", title: "Docker", icon: <FaDocker />, color: "#2496ED" },
  { id: "java", title: "Java", icon: <FaJava />, color: "#007396" },
  { id: "dotnet", title: ".NET", icon: <FaMicrosoft />, color: "#512BD4" },
  { id: "ai-ml", title: "AI/ML", icon: <FaBrain />, color: "#FF6F00" },
  { id: "database", title: "Database", icon: <FaDatabase />, color: "#7A5CAB" },
  { id: "gcp", title: "Google Cloud", icon: <FaGoogle />, color: "#4285F4" },
  { id: "linux", title: "Linux", icon: <FaLinux />, color: "#FCC624" },
];

export const TechnologyShowcase = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Box
      sx={{
        py: 10,
        background: `radial-gradient(ellipse at top left, ${alpha(
          theme.palette.primary.light,
          0.05
        )}, transparent 80%),
          radial-gradient(ellipse at bottom right, ${alpha(
            theme.palette.secondary.light,
            0.05
          )}, transparent 80%)`,
        position: "relative",
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            mb: 8,
            fontWeight: 900,
            position: "relative",
            "&::after": {
              content: '""',
              display: "block",
              width: "80px",
              height: "4px",
              background: `linear-gradient(90deg, ${PRIMARY_DARK}, ${SECONDARY_DARK})`,
              borderRadius: "2px",
              margin: "2rem auto 0",
            },
          }}
        >
          Core Technologies
        </Typography>

        <Grid container spacing={isMobile? 3: 4}>
          {techIcons.map((tech, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tech.id}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  textAlign: "center",
                  padding: "24px",
                  borderRadius: "20px",
                  cursor: "pointer",
                  background: alpha(tech.color, 0.1),
                  perspective: "1000px", // Add 3D perspective
                }}
              >
                <motion.div
                  animate={{
                    y: hoveredIndex === index? [-2, 2, -2]: 0,
                    rotate: hoveredIndex === index? [0, 5, -5, 0]: 0,
                    scale: hoveredIndex === index? 1.1: 1, // Add scale animation
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{
                    fontSize: "4rem",
                    color: tech.color,
                    marginBottom: "10px",
                  }}
                >
                  {tech.icon}
                </motion.div>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  {tech.title}
                </Typography>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};