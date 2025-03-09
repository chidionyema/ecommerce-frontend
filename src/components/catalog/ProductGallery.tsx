// File: components/catalog/ProductGallery.tsx
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { ContentDto } from '../../types/haworks.types';
import styles from '../../styles/ProductGallery.module.css';

interface ProductGalleryProps {
  images: ContentDto[];
  productName: string;
  fallbackImage?: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
  fallbackImage = 'https://via.placeholder.com/600x600?text=No+Image'
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  
  // Create a normalized array of image URLs
  const imageUrls = images.length > 0 
    ? images.map(img => img.url) 
    : [fallbackImage];

  // Handle main image click - toggle zoom
  const handleMainImageClick = () => {
    if (isLightboxOpen) return;
    setIsZoomed(!isZoomed);
  };

  // Handle image mouse move for zoom effect
  const handleImageMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isZoomed) return;
      
      // Get the container's dimensions and position
      const rect = e.currentTarget.getBoundingClientRect();
      
      // Calculate the relative cursor position in the container (0 to 1)
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      // Update the zoom position (in percentage)
      setZoomPosition({ x: x * 100, y: y * 100 });
    },
    [isZoomed]
  );

  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
    setIsZoomed(false);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        switch (e.key) {
          case 'ArrowLeft':
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : imageUrls.length - 1));
            break;
          case 'ArrowRight':
            setSelectedIndex(prev => (prev < imageUrls.length - 1 ? prev + 1 : 0));
            break;
          case 'Escape':
            setIsLightboxOpen(false);
            break;
        }
      } else if (document.activeElement === document.body) {
        // Only if nothing is focused (body is active element)
        switch (e.key) {
          case 'ArrowLeft':
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : imageUrls.length - 1));
            break;
          case 'ArrowRight':
            setSelectedIndex(prev => (prev < imageUrls.length - 1 ? prev + 1 : 0));
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen, imageUrls.length]);

  // Open lightbox
  const openLightbox = () => {
    setIsLightboxOpen(true);
    setIsZoomed(false);
  };

  // Go to previous image
  const prevImage = () => {
    setSelectedIndex(prev => (prev > 0 ? prev - 1 : imageUrls.length - 1));
  };

  // Go to next image
  const nextImage = () => {
    setSelectedIndex(prev => (prev < imageUrls.length - 1 ? prev + 1 : 0));
  };

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    // Calculate the distance moved
    const deltaX = touchEndX - touchStart.x;
    const deltaY = touchEndY - touchStart.y;
    
    // If horizontal swipe is more significant than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // If swiped more than 50px horizontally
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          // Right swipe
          prevImage();
        } else {
          // Left swipe
          nextImage();
        }
      }
    }
  };

  return (
    <div className={styles.galleryContainer}>
      {/* Main image */}
      <div 
        className={`${styles.mainImageContainer} ${isZoomed ? styles.zoomed : ''}`}
        onClick={handleMainImageClick}
        onMouseMove={handleImageMouseMove}
        onMouseLeave={() => setIsZoomed(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className={styles.mainImage}
          style={isZoomed ? {
            transform: `scale(2)`,
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
          } : undefined}
        >
          <Image
            src={imageUrls[selectedIndex]}
            alt={`${productName} - Image ${selectedIndex + 1}`}
            fill
            priority
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
          />
        </div>
        
        {/* Zoom indicators */}
        <div className={styles.zoomIndicator}>
          {isZoomed ? (
            <>
              <ZoomOut size={24} />
              <span>Click to zoom out</span>
            </>
          ) : (
            <>
              <ZoomIn size={24} />
              <span>Click to zoom in</span>
            </>
          )}
        </div>
        
        {/* Expand button */}
        <button 
          className={styles.expandButton}
          onClick={(e) => {
            e.stopPropagation();
            openLightbox();
          }}
          aria-label="View full size image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 21H3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 3L14 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 21L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {/* Navigation arrows for main view */}
        {imageUrls.length > 1 && (
          <>
            <button 
              className={`${styles.navButton} ${styles.prevButton}`}
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className={`${styles.navButton} ${styles.nextButton}`}
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
      
      {/* Thumbnails */}
      {imageUrls.length > 1 && (
        <div className={styles.thumbnailsContainer}>
          {imageUrls.map((url, index) => (
            <div 
              key={`thumb-${index}`}
              className={`${styles.thumbnail} ${selectedIndex === index ? styles.active : ''}`}
              onClick={() => handleThumbnailClick(index)}
            >
              <Image
                src={url}
                alt={`${productName} - Thumbnail ${index + 1}`}
                width={80}
                height={80}
                className={styles.thumbnailImage}
              />
            </div>
          ))}
        </div>
      )}
      
      {/* Lightbox */}
      {isLightboxOpen && (
        <div className={styles.lightbox}>
          <div className={styles.lightboxOverlay} onClick={() => setIsLightboxOpen(false)}>
            <div 
              className={styles.lightboxContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.lightboxImageContainer}>
                <Image
                  src={imageUrls[selectedIndex]}
                  alt={`${productName} - Lightbox Image ${selectedIndex + 1}`}
                  fill
                  className={styles.lightboxImage}
                  sizes="100vw"
                  priority
                  quality={100}
                />
              </div>
              
              <button 
                className={styles.lightboxClose}
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close lightbox"
              >
                ✕
              </button>
              
              {imageUrls.length > 1 && (
                <>
                  <button 
                    className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
                    onClick={prevImage}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={36} />
                  </button>
                  <button 
                    className={`${styles.lightboxNav} ${styles.lightboxNext}`}
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                    <ChevronRight size={36} />
                  </button>
                </>
              )}
              
              <div className={styles.lightboxCounter}>
                {selectedIndex + 1} / {imageUrls.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;