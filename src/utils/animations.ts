// utils/animations.ts
export const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  export const staggerProps = {
    initial: "hidden",
    animate: "visible",
    transition: { staggerChildren: 0.1 }
  };