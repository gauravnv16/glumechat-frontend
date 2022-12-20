// import { API }  from '../../DataBase/API'
// import api
import axios from 'axios';
import { useState } from 'react';
import { API } from '../../DataBase/API';
export const FileUploadScreen = (props = {user:{}}) => {
    const [filename, setFilename] = useState('');
    const [image, setImage] = useState('');
    // handle imageUpload
    //function to encrypt the message
    const encrypt = (text) => {
        let encrypted = "";
        for(let i=0;i<text.length;i++){
            encrypted += String.fromCharCode(text.charCodeAt(i) + 1);
        }
        return encrypted;
    }
        //function to decrypt the message
    const decrypt = (text) => {
        let decrypted = "";
            for(let i=0;i<text.length;i++){
            decrypted += String.fromCharCode(text.charCodeAt(i) - 1);
        }
        return decrypted;
    }
    //function to convert image to base64

    const convertBase64 = (file) => {
        const fileReader = new FileReader();
        return new Promise((resolve, reject) => {
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const getTime = () => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        let hour = hours % 12;
        if(hour === 0)  hour = 12;
        
        const minute = minutes < 10 ? '0' + minutes : minutes;
        const time = hour + ':' + minute + ' ' + ampm;
        return time;
    }

    const sendImage = (e) => {
        const time = getTime();

        const msgObj = {
            from:props.user.from,
            to:props.user.to,
            text:encrypt(image),
            time:time,
            type:"image"
        }

        axios.post(`${API}api/messages/sendMessage`, msgObj).then((res) => {
            console.log(res.data);
            
        }).catch((err) => {
            console.log(err);
        })

        
        // console.log(props.user);

    }
    // function to hadle the file upload
    const handleFileUpload = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        const base64 = await convertBase64(e.target.files[0]);

        formData.append('image',base64);
        formData.append('filename', e.target.files[0].name);
        // formData.append('image_remark', e.target.image_remark.value);
        fetch(`${ API }api/upload/messagefile`, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if(data.message === "uploaded successfully"){
                setFilename(data.file);
                setImage(API+"api/static/" + data.file)
                document.getElementById("uplodMenu").style.display = "none";
                document.getElementById("uploadedImage").style.display = "block";
                e.target.value = "";
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    const closeFileUploadScreen = () => {
        let fileUploadScreen = document.getElementById('fileUploadScreen');
        fileUploadScreen.style.display = "none";
    }
    return(
        <div className="file-upload-screen" id="fileUploadScreen">
           <form >
           <div className="file-upload-screen-header">
                <div className="file-upload-screen-header-left ">
                    <div className="flex">
                    <i className="fas fa-arrow-left" onClick = { closeFileUploadScreen }></i>
                    <h1>File</h1>
                    </div>
                    
                </div>
                <div className="file-upload-screen-header-right">
                    <i className="fas fa-ellipsis-v"></i>
                </div>
            </div>
            <div className="file-upload-screen-body">
                <div className="file-upload-screen-body-header">
                    <div className="file-upload-screen-body-header-left">
                        <div>
                        <img src={API+"api/static/" + filename} alt="" id="uploadedImage" style={{"display":"none"}} className="uploaded-image"/>
                        <label htmlFor="image" id="uplodMenu">
                           
                        <i className="fas fa-folder"></i>
                        <span>upload</span>
                        {/* <h1>My Files</h1> */}
                        <input type="file" name="image" id="image" onChange={handleFileUpload} />
                        </label>
                        </div>
                    </div>
                    
                </div>
            </div>
            
            <div className="file-upload-screen-footer">
                <div className="file-upload-screen-footer-info">
                    <input type="text" name="image_remark" id="image_remark" placeholder="Add a caption" />
                    <i className="fas fa-paper-plane" onClick={
                        sendImage
                    }></i>
                </div>
            </div>
           </form>
        </div>

    )
}