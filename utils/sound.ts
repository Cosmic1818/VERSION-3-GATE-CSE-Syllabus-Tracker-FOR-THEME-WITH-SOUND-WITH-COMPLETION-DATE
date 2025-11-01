// Create a single AudioContext instance to be reused.
// It's initialized on the first user interaction to comply with browser autoplay policies.
let audioContext: AudioContext | null = null;

const initializeAudioContext = () => {
  if (!audioContext) {
    try {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch(e) {
        console.error("Web Audio API is not supported in this browser");
    }
  }
};

export const playClickSound = () => {
  initializeAudioContext();
  
  if (!audioContext) return;

  // If the context is suspended (common in modern browsers), resume it.
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Configure the sound to be a short, high-pitched "click"
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A high "A" note
  gainNode.gain.setValueAtTime(0.2, audioContext.currentTime); // Start at a low volume

  // Rapidly decrease the volume to create a "pop" or "click" sound effect
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.1);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.1);
};
