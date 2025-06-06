import { toast } from 'react-toastify';
import { GameFormData } from '../components/Modal/Modal.tsx';

export const validateCreateGamesForm = (formData: GameFormData) => {
  if (!formData?.title) {
    toast.error('Field title is required');
    return false;
  }
  if (!formData?.category) {
    toast.error('Field category is required');
    return false;
  }
  if (!formData?.acquisitionDate) {
    toast.error('Field Acquisition date is required');
    return false;
  }
  if (!formData?.status) {
    toast.error('Field status is required');
    return false;
  }
  if (
    (formData?.status === 'DONE' || formData?.status === 'ABANDONED') &&
    !formData?.finishDate
  ) {
    toast.error('End date is required when status is DONE or ABANDONED');
    return false;
  }
  return true;
};
