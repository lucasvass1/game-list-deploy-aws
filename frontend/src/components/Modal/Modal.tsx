import React, { useEffect, useRef, useState } from "react";
import * as S from "./Modal.ts";
import ModalButton from "../ModalButton/ModalButton.tsx";

interface ModalSelectInputProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onSave?: (formData: GameFormData) => void;
}

export interface GameFormData {
  title: string;
  description: string;
  category: string;
  platform: string;
  acquisitionDate: string;
  finishDate: string;
  status: string;
  favorite: boolean;
  imageUrl: string;
}

const Modal: React.FC<ModalSelectInputProps> = ({
  isOpen,
  onClose,
  title = "New game",
  onSave,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<GameFormData>({
    title: "",
    description: "",
    category: "",
    platform: "",
    acquisitionDate: "",
    finishDate: "",
    status: "",
    favorite: false,
    imageUrl: "",
  });

  const categories = [
    "Action",
    "Adventure",
    "RPG",
    "Strategy",
    "Sports",
    "Simulation",
    "Puzzle",
  ];
  const platforms = ["PC", "PlayStation", "Xbox", "Nintendo", "Mobile"];
  const statuses = ["Not started", "In progress", "Completed", "Abandoned"];

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = () => {
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContainer ref={modalRef}>
        <S.ModalHeader>
          <S.Title>{title}</S.Title>
          <S.CloseButton onClick={onClose}>×</S.CloseButton>
        </S.ModalHeader>

        <S.FormContainer>
          <S.FormGroup>
            <S.Label>
              Title<S.Required>*</S.Required>
            </S.Label>
            <S.Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Mario Kart 8"
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>Description</S.Label>
            <S.Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Amazing game"
            />
          </S.FormGroup>

          <S.FormRow>
            <S.FormGroup>
              <S.Label>
                Category<S.Required>*</S.Required>
              </S.Label>
              <S.Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </S.Select>
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>Platform</S.Label>
              <S.Select
                name="platform"
                value={formData.platform}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select platform
                </option>
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </S.Select>
            </S.FormGroup>
          </S.FormRow>

          <S.FormRow>
            <S.FormGroup>
              <S.Label>
                Acquisition date<S.Required>*</S.Required>
              </S.Label>
              <S.Input
                type="date"
                name="acquisitionDate"
                value={formData.acquisitionDate}
                onChange={handleInputChange}
                placeholder="DD/MM/YYYY"
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>
                Finish date<S.Required>*</S.Required>
              </S.Label>
              <S.Input
                type="date"
                name="finishDate"
                value={formData.finishDate}
                onChange={handleInputChange}
                placeholder="DD/MM/YYYY"
              />
            </S.FormGroup>
          </S.FormRow>

          <S.FormRow>
            <S.FormGroup>
              <S.Label>
                Status<S.Required>*</S.Required>
              </S.Label>
              <S.Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select status
                </option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </S.Select>
            </S.FormGroup>

            <S.FormGroup className="checkbox-group">
              <S.CheckboxContainer>
                <S.Checkbox
                  type="checkbox"
                  name="favorite"
                  checked={formData.favorite}
                  onChange={handleCheckboxChange}
                  id="favorite-checkbox"
                />
                <S.Label htmlFor="favorite-checkbox">Favorite</S.Label>
              </S.CheckboxContainer>
            </S.FormGroup>
          </S.FormRow>

          <S.FormGroup>
            <S.Label>Image (url)</S.Label>
            <S.Input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="http://..."
            />
          </S.FormGroup>
        </S.FormContainer>

        <S.ButtonContainer>
          <ModalButton onClick={handleSubmit}>CREATE</ModalButton>
        </S.ButtonContainer>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default Modal;
