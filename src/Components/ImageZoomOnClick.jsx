import { useState } from "react";
import { saveAs } from 'file-saver';
import { v4 as uuidv4 } from 'uuid';

export const ImageZoomOnClick = (props={image:{src:""}}) => {
    const [imageSrc, setImageSrc] = useState(props.image.src);
    const CloseContiner = () => {
        props.image.isZoom = false;
        props.image.src = "";
    }
 
    // function to download
    const downloadImage = () => {
        const url = String(props.image.src);
        console.log(url);
        saveAs(url,`${uuidv4()}.jpg`)
    }
    

    if(props.image.isZoom){
        return(
            <div className="image-zoom-container" style={{"display":"flex"}}>
               <div>
               <div className="image-zoom-header">
                    <i className="fas fa-times" onClick={ CloseContiner }></i>
                    <i className="fas fa-download" onClick={ downloadImage } style={{"visibility":"hidden"}}></i>
                </div>
                <div className="image-zoom-body">
                    <img src={props.image.src} alt=""  className="image-zoom-conainer-image"/>
                </div>
                <div className="image-zoom-header">
                    <i className="fas fa-times" onClick={ CloseContiner } style={{"visibility":"hidden"}}></i>
                    <i className="fas fa-download" onClick={ downloadImage }></i>
                </div>
               </div>
                
            </div>
    
        )
    }
}