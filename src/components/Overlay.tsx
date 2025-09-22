import { toast } from 'react-toastify';
import '/src/assets/overlay.css'; 

export default function Overlay ( {show}:{show:boolean} ) {
    // console.log(show)
    // console.log(toast.isActive("uploading"))
     return show ? <div className="overlay"></div> : null; 
    };