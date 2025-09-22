import { DeleteIcon, FileIcon, ImageIcon, XIcon } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AxiosProgressEvent } from 'axios';import { FormContext } from '@/providers/formContext';
import useAxiosAuth from '@/lib/api/axios/hooks/useAxiosAuth';
import { Backend_Public_URL } from '@/lib/constants/Constants';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { TooltipProvider, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';



type TFileUploadProps = {
  onChange: (value: File[]) => void;
  name: string;
  title: string

};

export type Attachement = {
  name: string;
  path: string;
  downloadUrl: string;
}


export default function FileUpload({ title,name/* , modelName, refLinkId */ }: TFileUploadProps) {

  const form = useContext(FormContext);
  const axios = useAxiosAuth()
  const value = form.watch(name)
  useEffect(() => {
    const initValue = form.getValues(name)
    if (Array.isArray(initValue)) {
      const values = initValue.map((item => {
        if (typeof item === "object") {
          if (!item.path) {
            console.error("FileUpload input value just be of type Attachement")
            return null;
          }
          return item;
        }
      }))
      setUploadedFiles(values)
    } else {
      setUploadedFiles([])
    }
  }, [value])

  useEffect(() => {
    if (Array.isArray(value)) {
      const values = value.map((item => {
        if (typeof item === "object") {
          if (!item.path) {
            console.error("FileUpload input value just be of type Attachement")
            return null;
          }
          return item;
        }
      }))
      setUploadedFiles(values)
    } else {
      setUploadedFiles([])
    }
  }, [value])

  const [uploadedFiles, setUploadedFiles] = useState<Attachement[]>([]);
  const [uploadedFilesStatus, setUploadedFilesStatus] = useState<any>({});


  const newUploadingFiles: { [key: string]: Attachement[] } = {};
  const uploadingFileStatusBuffer: { [key: string]: { file: string, progress: number, error?: string } } = {};

  function appendToUploadedFiles(uploadingKey: string, file: Attachement) {
    newUploadingFiles[uploadingKey].push(file)
    setUploadedFiles([...uploadedFiles, ...newUploadingFiles[uploadingKey]])
    form.setValue(name, [...uploadedFiles, ...newUploadingFiles[uploadingKey]])
  }

  function initNewUploadingBuffer(uploadingKey: string) {
    newUploadingFiles[uploadingKey] = []
  }


  function clearNewUploadingBuffer(uploadingKey: string) {
    delete newUploadingFiles[uploadingKey];
    setUploadedFiles({ ...uploadedFiles })
  }


  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    onDrop: async (acceptedFiles: File[]) => {
      const uploadingKey = "" + Date.now() + Math.floor(Math.random() * 10000);
      initNewUploadingBuffer(uploadingKey)



      const uploadPromises = acceptedFiles.map(async (file:any) => {
        if (!uploadingFileStatusBuffer[file.path]) {
          uploadingFileStatusBuffer[file.path] = { file: file.path, progress: 0 }
          setUploadedFilesStatus({ ...uploadedFilesStatus, ...uploadingFileStatusBuffer })
        }
        try {
          const formData = new FormData();
          formData.append('file', file);
          const response = await axios.post(Backend_Public_URL + '/attachements/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
              // const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');

              const totalLength = progressEvent.total;


              if (totalLength) {
                const progressValue = Math.round((progressEvent.loaded * 100) / totalLength)

                if (!uploadingFileStatusBuffer[file.path]) {
                  uploadingFileStatusBuffer[file.path] = { file: file.path, progress: 0 }
                }
                uploadingFileStatusBuffer[file.path].progress = progressValue
                console.log(uploadingFileStatusBuffer)
                setUploadedFilesStatus({ ...uploadedFilesStatus, ...uploadingFileStatusBuffer })
              }
            }
          });
          if (response.data.data.attachement) {
            appendToUploadedFiles(uploadingKey, response.data.data.attachement);
            delete uploadingFileStatusBuffer[file.path];
            delete uploadedFilesStatus[file.path];
            setUploadedFilesStatus({ ...uploadedFilesStatus, ...uploadingFileStatusBuffer })
          }

        } catch (error) {
          uploadingFileStatusBuffer[file.path].error = String(error);
        } finally {
        }
      });
      await Promise.all(uploadPromises)
      clearNewUploadingBuffer(uploadingKey)
    }
  });
  const deleteAttachement = (file: Attachement) => {
    const newUploadedFiles = uploadedFiles.filter((item) => { return item.path != file.path })
    console.log("asdfasdfadf")
    setUploadedFiles(newUploadedFiles)

    form.setValue(name, newUploadedFiles)

  }
  function dropFileInprogress(file: string): void {
    delete uploadingFileStatusBuffer[file];
    delete uploadedFilesStatus[file];
    setUploadedFilesStatus({ ...uploadedFilesStatus, ...uploadingFileStatusBuffer })
  }



  return (
    <FormField
      control={form?.control}
      name={name}
      render={() => (
        <FormItem className="flex flex-col space-y-2 mb-2">
          <FormLabel>{title}</FormLabel>
          <FormControl className="">
            <div className='flex items-center flex-wrap' >
              <div {...getRootProps({ className: 'dropzone cursor-pointer' })}>
                <input {...getInputProps()} />
                <Button variant="outline" className="" type="button">
                  <FileIcon className="h-4 w-4 " />
                  Add File
                </Button>
              </div>
              {uploadedFiles && !!uploadedFiles.length ?
                uploadedFiles.map(item => {

                  return <ImagePreview file={item} deleteAttachement={deleteAttachement} />
                })
                : <span className="ml-2 text-sm text-muted-foreground"></span>}
              <span>
                {/* {JSON.stringify(uploadedFilesStatus)} */}
              </span>

              {uploadedFilesStatus && Object.values(uploadedFilesStatus).length ?
                Object.values(uploadedFilesStatus).map((item:any) => {

                  return <div className="border border-blue-700 flex items-center p-1 ml-2 rounded-lg ">
                    <span className="text-xs text-muted-foreground pr-2 min-w-28 w-32 overflow-hidden text-nowrap">
                      <span className="text-blue-800">
                        {item.progress}%
                      </span> {item.file.split("/")[1]} </span>{item.error && (<span className="flex text-red-700 text-sm px-2">{item.error} <DeleteIcon onClick={() => dropFileInprogress(item.file)} /></span>)}
                  </div>
                }) : ""}
            </div>

          </FormControl>

          <FormMessage className='h-auto min-h-2' />
        </FormItem>
      )}
    />




  );
}

function ImagePreview({ file, deleteAttachement }: { file: Attachement, deleteAttachement: (file: Attachement) => void}) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);


  useEffect(() => {
    // Create an object URL for the file
    const url = Backend_Public_URL + "/uploads/" + file.path;
    setObjectUrl(url);

    // Clean up the object URL when the component unmounts
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const nameOrginal = file.name.split('/').pop();
  const Icon = objectUrl && isImage(file.name) ? ImageIcon : FileIcon;


  return (
    <div className="border border-teal-800 flex items-center p-1 ml-2 rounded-lg mt-1 mb-1 ">
      <Icon className=" h-5 w-5 object-cover text-teal-800 text-muted-foreground mr-1 mt " />
      <XIcon className='cursor-pointer text-xs text-red-600 w-4 h-4 mr-2 ' onClick={() => deleteAttachement(file)} />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-xs text-muted-foreground pr-2 min-w-28 w-28 overflow-hidden text-nowrap">{nameOrginal}</span>
          </TooltipTrigger>
          <TooltipContent>
            {nameOrginal}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

    </div>
  );
}

const isImage = (filePath: string) => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.tiff'];
  let extension = filePath.split('.').pop();
  if (!extension) {
    return false;
  }
  extension = extension.toLowerCase();
  return imageExtensions.includes(`.${extension}`);
}
