import FloatingAudioPlayer from "@/components/FloatingAudioPlayer";

export default function RespiracaoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <FloatingAudioPlayer />
    </>
  );
}