'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export interface MediaItem {
  src: string;
  title: string;
  date?: string;
}

interface ScrollExpandMediaProps {
  mediaItems: MediaItem[]; // Array of structured objects for text and images
  bgImageSrc: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaItems = [],
  bgImageSrc,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  const trackHeightVh = Math.max(150, mediaItems.length * 150);
  const stickOffset = 80; // height of the navbar in pixels

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const top = rect.top;
      
      const stickyElementHeight = window.innerHeight - stickOffset;
      const scrollDistance = (trackHeightVh / 100) * window.innerHeight - stickyElementHeight;
      
      if (top <= stickOffset) {
        const scrolled = stickOffset - top;
        const progress = Math.min(Math.max(scrolled / scrollDistance, 0), 1);
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackHeightVh]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // 1. Calculate expansion Phase
  const expansionPhaseEnd = Math.min(0.2, 1 / Math.max(mediaItems.length, 1));
  const expansionProgress = Math.min(scrollProgress / expansionPhaseEnd, 1);

  // 2. Calculate transition Phase for the images
  const numTransitions = Math.max(0, mediaItems.length - 1);
  const transitionScrollProgress = Math.max(0, scrollProgress - expansionPhaseEnd);
  
  const normalizedTransitionProgress = expansionPhaseEnd === 1 ? 0 : 
    transitionScrollProgress / (1 - expansionPhaseEnd);

  const activeTransitionFloat = normalizedTransitionProgress * numTransitions; 
  const transitionIndex = Math.floor(activeTransitionFloat);
  const fadeAmount = activeTransitionFloat - transitionIndex;

  const getImageOpacity = (i: number) => {
    if (i === 0) return 1; 
    if (transitionIndex < i - 1) return 0;
    if (transitionIndex === i - 1) return fadeAmount;
    return 1; 
  };

  const clampMap = (val: number, inMin: number, inMax: number) => 
    Math.min(Math.max((val - inMin) / (inMax - inMin), 0), 1);

  // 3. Text Progress calculation
  // Computes how visible text [i] should be (0 to 1) 
  const getTextProgress = (i: number) => {
    if (mediaItems.length === 1) {
      return i === 0 ? 1 - expansionProgress : 0;
    }
    
    // First image's text behaves like original: fades out as expansion completes.
    if (i === 0) {
      if (scrollProgress <= expansionPhaseEnd) {
         return clampMap(1 - expansionProgress, 0, 0.8);
      }
      return 0;
    }

    // Images 1-4 fade in precisely when their images crossfade
    if (transitionIndex === i - 1) return clampMap(fadeAmount, 0, 0.7);       // coming in
    if (transitionIndex === i) return 1 - clampMap(fadeAmount, 0.3, 1);       // leaving
    
    return 0; // inactive
  };

  const mediaWidth = `calc(300px + ${expansionProgress} * (100vw - 300px))`;
  const mediaHeight = `calc(400px + ${expansionProgress} * (100% - 400px))`;

  return (
    <div className='relative w-full bg-background'>
      {/* Scroll Track */}
      <div 
        ref={sectionRef} 
        style={{ height: `${trackHeightVh}vh` }} 
        className='w-full'
      >
        <div 
          className='sticky w-full overflow-hidden flex flex-col items-center justify-start bg-background border-b border-border'
          style={{ top: `${stickOffset}px`, height: `calc(100dvh - ${stickOffset}px)` }}
        >
          
          <motion.div
            className='absolute inset-0 z-0 h-full pointer-events-none'
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 - expansionProgress }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt='Background'
              fill
              className='object-cover object-center opacity-40'
              priority
            />
            <div className='absolute inset-0 bg-black/10' />
          </motion.div>

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10 h-full'>
            <div className='flex flex-col items-center justify-center w-full h-full relative'>
              
              {/* Media Expansion Block */}
              <div
                className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none overflow-hidden'
                style={{
                  width: mediaWidth,
                  height: mediaHeight,
                  borderRadius: `calc(1rem - ${expansionProgress} * 1rem)`,
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.6)',
                }}
              >
                <div className='relative w-full h-full'>
                  {mediaItems.map((item, i) => (
                    <motion.div
                      key={item.src}
                      className='absolute inset-0 z-0'
                      style={{ opacity: getImageOpacity(i), zIndex: i }}
                    >
                      <Image
                        src={item.src}
                        alt={item.title || `Media content ${i + 1}`}
                        fill
                        className='object-cover'
                        priority={i === 0}
                      />
                    </motion.div>
                  ))}

                  <motion.div
                    className='absolute inset-0 z-50 bg-black/50 pointer-events-none'
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 0.7 - expansionProgress * 0.4 }}
                    transition={{ duration: 0.2 }}
                  />
                  
                  {/* Inner text content omitted here, moved outwards */}
                  
                  {scrollToExpand && (
                    <div className="absolute inset-x-0 bottom-10 flex justify-center z-50 pointer-events-none">
                      <motion.p
                        className='text-white/70 font-medium text-center uppercase tracking-widest text-sm transition-none'
                        animate={{ opacity: 1 - expansionProgress }}
                      >
                        {scrollToExpand}
                      </motion.p>
                    </div>
                  )}
                </div>
              </div>

              {/* Title Typography (Outer H2s) */}
              {mediaItems.map((item, i) => {
                const progress = getTextProgress(i);
                if (progress <= 0) return null;
                
                const offset = (1 - progress) * (isMobileState ? 180 : 150);
                const firstWord = item.title ? item.title.split(' ')[0] : '';
                const restOfTitle = item.title ? item.title.split(' ').slice(1).join(' ') : '';

                return (
                  <div
                    key={`title-${i}`}
                    className={`absolute inset-0 flex items-center justify-center text-center gap-4 w-full z-[60] flex-col pointer-events-none ${
                        textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                    }`}
                    style={{ opacity: progress }}
                  >
                    <h2
                      className='text-5xl md:text-6xl lg:text-7xl font-bold text-white transition-none drop-shadow-lg'
                      style={{ transform: `translateX(-${offset}vw)` }}
                    >
                      {firstWord}
                    </h2>
                    <h2
                      className='text-5xl md:text-6xl lg:text-7xl font-bold text-center text-white transition-none drop-shadow-lg'
                      style={{ transform: `translateX(${offset}vw)` }}
                    >
                      {restOfTitle}
                    </h2>
                    {item.date && (
                      <p
                        className='text-xl md:text-2xl text-white/90 font-medium tracking-wide mt-2 md:mt-4 transition-none drop-shadow-lg'
                        style={{ transform: `translateX(-${offset}vw)` }}
                      >
                        {item.date}
                      </p>
                    )}
                  </div>
                );
              })}
              
            </div>
          </div>
        </div>
      </div>

      <div className='relative z-20 w-full bg-background'>
        {children}
      </div>
    </div>
  );
};

export default ScrollExpandMedia;
