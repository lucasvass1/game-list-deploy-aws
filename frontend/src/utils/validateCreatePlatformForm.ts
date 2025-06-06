import { toast } from 'react-toastify';
import { PlatformFormData } from '../components/Modal/Modal.tsx';

export const validateCreatePlatformForm = (formData: PlatformFormData) => {
  if (!formData?.platformName) {
    toast.error('Field title is required');
    return false;
  }
  return true;
};
