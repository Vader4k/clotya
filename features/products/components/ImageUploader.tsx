import React from 'react'
import { X, Image as ImageIcon } from 'lucide-react'
import { optimizeImage } from '../utils/image.utils'

export interface ImageUploaderProps {
  value?: string[];
  onChange?: (urls: string[]) => void;
}

export const ImageUploader = ({ value = [], onChange }: ImageUploaderProps) => {

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);

      try {
        const optimizedFiles = await Promise.all(
          newFiles.map(file => optimizeImage(file))
        );

        if (onChange) {
          onChange([...value, ...optimizedFiles]);
        }
      } catch (error) {
        console.error("Error optimizing images:", error);
      }
    }
  }

  const handleRemove = (index: number) => {
    if (onChange) {
      const newValues = [...value];
      newValues.splice(index, 1);
      onChange(newValues);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
        {value.map((url, index) => (
          <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border">
            <img src={url} alt={`preview-${index}`} className="object-cover w-full h-full" />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 bg-white/80 p-1 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        <label className="border-2 border-dashed border-gray-300 rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
          <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-xs text-gray-500 font-medium">Upload</span>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  )
}
