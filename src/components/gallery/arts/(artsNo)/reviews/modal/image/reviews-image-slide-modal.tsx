import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import type { ArtReview } from '@/types/gallery/review';

type ReviewsImageSlideModalProps = {
  isImageSildeOpen: boolean;
  onClose: () => void;
  onBackToReview: () => void;
  selectedReview: ArtReview;
};

export default function ReviewsImageSlideModal({
  isImageSildeOpen,
  onClose,
  onBackToReview,
  selectedReview,
}: ReviewsImageSlideModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = selectedReview.files || [];
  const hasMultipleImages = images.length > 1;

  console.log(selectedReview);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleClose = () => {
    onClose();
    onBackToReview();
  };

  return (
    <Dialog open={isImageSildeOpen} onOpenChange={handleClose}>
      <DialogContent className='w-full max-w-[95vw] sm:max-w-[90vw] xl:max-w-[85vw] max-h-[95vh] h-auto overflow-visible p-0 bg-black/90'>
        <div className='relative w-full h-full min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] flex items-center justify-center'>
          <button
            onClick={handleClose}
            className='absolute top-4 right-4 z-50 text-white hover:text-gray-300 transition-colors'
          >
            <X className='w-6 h-6' />
          </button>

          <div className='relative w-full h-full flex items-center justify-center'>
            <img
              src={images[currentIndex]?.url}
              alt={`Review image ${currentIndex + 1}`}
              className='max-w-full max-h-[80vh] object-contain'
            />
          </div>

          {hasMultipleImages && (
            <>
              <button
                onClick={handlePrevious}
                className='absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2'
              >
                <ChevronLeft className='w-8 h-8 sm:w-10 sm:h-10' />
              </button>
              <button
                onClick={handleNext}
                className='absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2'
              >
                <ChevronRight className='w-8 h-8 sm:w-10 sm:h-10' />
              </button>
            </>
          )}

          {hasMultipleImages && (
            <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
