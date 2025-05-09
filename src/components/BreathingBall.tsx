import { motion } from "framer-motion";

type BreathingBallProps = {
  phase: "inhale" | "hold" | "exhale";
  animationDuration: number;
  textColor?: string;
  glowColor?: string;
  shadowColor?: string;
  backgroundColor?: string;
};

export default function BreathingBall({
  phase,
  animationDuration,
  textColor = "#000000",
  glowColor = "#ffffff",
  shadowColor = "#cccccc",
  backgroundColor = "rgba(255, 255, 255, 0.4)",
}: BreathingBallProps) {
  const label =
    phase === "inhale" ? "Inspire" : phase === "hold" ? "Segure" : "Expire";

  return (
    <div className="relative flex items-center justify-center mb-6">
      <motion.div
        className="absolute"
        style={{
          width: "340px",
          height: "340px",
          borderRadius: "9999px",
          pointerEvents: "none",
          boxShadow: `0 0 80px 20px ${glowColor}88, 0 0 160px 60px ${glowColor}77, 0 0 40px 10px ${shadowColor}99`,
          zIndex: 0,
        }}
        animate={{
          scale: phase === "inhale" || phase === "hold" ? 1.5 : 1.1,
          opacity: phase === "inhale" || phase === "hold" ? 0.6 : 0.3,
        }}
        transition={{ duration: animationDuration, ease: "linear" }}
      />
      <motion.div
        className="rounded-full flex items-center justify-center text-2xl font-medium relative z-10 shadow-lg"
        style={{
          width: "240px",
          height: "240px",
          backgroundColor: backgroundColor,
          color: textColor,
        }}
        animate={{
          scale: phase === "inhale" || phase === "hold" ? 1.4 : 0.8,
        }}
        transition={{ duration: animationDuration, ease: "linear" }}
      >
        {label}
      </motion.div>
    </div>
  );
}
