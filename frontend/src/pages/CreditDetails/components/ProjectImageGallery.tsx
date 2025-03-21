import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ProjectImageGalleryProps {
  images: string[];
  projectName: string;
}

const ProjectImageGallery: React.FC<ProjectImageGalleryProps> = ({
  images,
  projectName
}) => {
  const [currentImage, setCurrentImage] = useState<number>(0);

  return (
    <Card>
      <CardContent className="p-0">
        <div className="aspect-video w-full overflow-hidden bg-muted relative">
          <img
            src={images[currentImage]}
            alt={projectName}
            className="h-full w-full object-cover"
          />
        </div>
        {images.length > 1 && (
          <div className="flex gap-2 p-4">
            {images.map((img, index) => (
              <button
                key={index}
                className={`block h-16 w-16 overflow-hidden rounded border ${
                  currentImage === index ? "border-primary" : "border-muted"
                }`}
                onClick={() => setCurrentImage(index)}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectImageGallery;