import React, { ChangeEvent, useState } from 'react';

interface ImageUploaderProps {
    width: number;
    height: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = (props) => {
  const { width, height } = props;
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label htmlFor="imageInput">
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            borderRadius: '50%',
            border: '1px solid #ccc',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          )}
        </div>
      </label>
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ImageUploader;