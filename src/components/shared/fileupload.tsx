// import { AvatarIcon } from '@radix-ui/react-icons';
// import { CameraIcon } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { Accept, useDropzone } from 'react-dropzone';

// type TFileUploadProps = {
//   onChange: (value: File[]) => void;
//   value: File[];
// };
// export default function FileUpload({ onChange, value }: TFileUploadProps) {
//   console.log('files=>', value);

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: 'image/*' as unknown as Accept,
//     onDrop: (acceptedFiles: File[]) => {
//       console.log('files acceptedFiles=>', acceptedFiles);
//       onUpdateFile(acceptedFiles);
//     }
//   });

//   const onUpdateFile = (newFiles: File[]) => {
//     onChange(newFiles);
//   };
//   return (
//     <div className="flex items-center justify-center">
//       <div className="relative h-36 w-36 overflow-hidden rounded-full bg-gray-200 shadow-2xl ">
//         <div {...getRootProps({ className: 'dropzone cursor-pointer' })}>
//           <input {...getInputProps()} />
//           {value && !!value.length ? (
//             <ImagePreview file={value[0]} />
//           ) : (
//             <AvatarIcon className="h-36 w-36 text-gray-100" />
//           )}

//           <p className="absolute -bottom-5 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center bg-gray-300 bg-opacity-50 py-1 text-xs font-normal text-muted-foreground ">
//             <CameraIcon className="h-4 w-4 text-muted-foreground" />
//             Add Image
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ImagePreview({ file }: { file: File }) {
//   const [objectUrl, setObjectUrl] = useState<string | null>(null);

//   useEffect(() => {
//     // Create an object URL for the file
//     const url = URL.createObjectURL(file);
//     setObjectUrl(url);

//     // Clean up the object URL when the component unmounts
//     return () => {
//       URL.revokeObjectURL(url);
//     };
//   }, [file]);

//   return objectUrl ? (
//     <img
//       src={objectUrl}
//       alt="Preview"
//       className="absolute  h-full w-full rounded-full object-cover"
//     />
//   ) : null;
// }



import { AvatarIcon } from '@radix-ui/react-icons';
import { CameraIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

type TFileUploadProps = {
  register: UseFormRegister<any>; // Accept the register function from react-hook-form
  name: string; // Add a name prop for the input
  setValue: (name: string, value: FileList | null) => void; // Set value for react-hook-form
  value: FileList | null; // Current value of the file input
};

export default function FileUpload({ register, name, setValue, value }: TFileUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setValue(name, files); // Set the value in react-hook-form
    if (files && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null); // Reset preview if no file
    }
  };

  useEffect(() => {
    // Clean up the object URL when the component unmounts
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="flex items-center justify-center">
      <div className="relative h-36 w-36 overflow-hidden rounded-full bg-gray-200 shadow-2xl ">
        <input
          type="file"
          accept="image/*"
          {...register(name)} // Register the input with react-hook-form
          onChange={handleImageUpload} // Handle image upload
          className="absolute inset-0 cursor-pointer opacity-0" // Hidden file input
        />
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="absolute h-full w-full rounded-full object-cover"
          />
        ) : (
          <AvatarIcon className="h-36 w-36 text-gray-100" />
        )}

        <p className="absolute -bottom-5 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center bg-gray-300 bg-opacity-50 py-1 text-xs font-normal text-muted-foreground ">
          <CameraIcon className="h-4 w-4 text-muted-foreground" />
          Add Image
        </p>
      </div>
    </div>
  );
}
