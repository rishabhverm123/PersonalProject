import { toast } from 'react-toastify';
import {NotificationType} from './../helperclasses/enums'

export class NotificationService {

    showNotification(type,message){

        const notify_config={
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            }
        if(type===NotificationType.Info){
            toast.info(message, notify_config);
        }
        else if(type===NotificationType.Success){
            toast.success(message, notify_config);
        }
        else if(type===NotificationType.Error){
            toast.error(message, notify_config);
        }
        else if(type===NotificationType.Warning){
            toast.warn(message, notify_config);
        }
        else{
            toast(message, notify_config);
        }
    
    }
}