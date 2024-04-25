import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { toast } from "react-toastify"
import { storage } from '../lib/firebase';


const upload = async (file) => {
    const date = new Date()
    const storageRef = ref(storage, `images/${date + file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    return new Promise((resolve, reject) => {

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log("Upload is" + progress + "% done")
            },
            (error) => {
                reject("Something went wrong" + error.code)
            },
            () => {
                toast.success("File Uploaded Successfully")
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL)
                })
            }
        )
    }
    )
}


export default upload