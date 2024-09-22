import { useDropzone } from "react-dropzone";
import "./style.css";
import { ReactNode } from "react";

interface DropZoneProps {
  children: ReactNode;
  onUpload: (file: Array<File>) => void;
}

export default function DropZone({ children, onUpload }: DropZoneProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (t) => onUpload(t),
  });

  return (
    <section className="dropContainer" style={{ zIndex: 100 }}>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {children}
      </div>
    </section>
  );
}
