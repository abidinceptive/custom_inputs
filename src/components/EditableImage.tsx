import { useState, useRef } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";

const EditableImage = ({
  labelT,
  imgSrc,
  onSaveImage,
  disabled,
  note,
}: {
  labelT: string;
  imgSrc: string;
  onSaveImage: (file: File) => Promise<void>;
  disabled?: boolean;
  note?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create preview URL for the selected file
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleSave = async () => {
    if (!selectedFile) return;

    try {
      setIsLoading(true);
      await onSaveImage(selectedFile);
      setIsLoading(false);
      setIsOpen(false);
      // Clean up the object URL to avoid memory leaks
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      setSelectedFile(null);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleDialogClose = (open: boolean) => {
    if (!open && previewUrl) {
      // Clean up the preview URL when dialog is closed without saving
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      setSelectedFile(null);
    }
    setIsOpen(open);
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="flex justify-between items-center">
          <Label>{labelT}</Label>
          {!disabled && (
            <Dialog open={isOpen} onOpenChange={handleDialogClose}>
              <DialogTrigger asChild>
                <Button variant="ghost">Change</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit image</DialogTitle>
                  <DialogDescription>
                    Click on the image to upload a new one, then click save when
                    you're done.
                  </DialogDescription>
                </DialogHeader>
                {/* Edit image */}
                <div
                  className="relative cursor-pointer mt-4 flex items-center justify-center"
                  onClick={handleImageClick}
                >
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-2 hover:border-gray-400 transition-colors">
                    <img
                      src={previewUrl || imgSrc}
                      alt="Preview"
                      className="max-h-64 max-w-full object-contain"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity">
                      <p className="text-white font-medium bg-black bg-opacity-50 px-2 py-1 rounded">
                        Click to change image
                      </p>
                    </div>
                  </div>
                </div>

                <DialogFooter className="mt-4">
                  <Button
                    variant="outline"
                    onClick={() => handleDialogClose(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={!selectedFile || isLoading}
                  >
                    {isLoading ? "Saving..." : "Save changes"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
        {!!note && <p className="text-sm text-muted-foreground">{note}</p>}
      </div>
      <img
        src={imgSrc || "https://placehold.co/600x400"}
        alt="Image"
        className="w-full max-w-xs p-2 rounded-sm aspect-auto"
      />
    </div>
  );
};

export default EditableImage;
