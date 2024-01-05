import { toast } from 'react-toastify';


export class NotificationService {

    NotificationType= {
        Success : 'Success',
        Error : 'Error',
        Info : 'Info',
        Warning : 'Warning',
        Confirm:'Confirm',
        Delete:'Delete',
        AccessDenied:'Access Denied',
        Logout:'Logout'
      }

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
        if(type===this.NotificationType.Info){
            toast.info(message, notify_config);
        }
        else if(type===this.NotificationType.Success){
            toast.success(message, notify_config);
        }
        else if(type===this.NotificationType.Error){
            toast.error(message, notify_config);
        }
        else if(type===this.NotificationType.Warning){
            toast.warn(message, notify_config);
        }
        else{
            toast(message, notify_config);
        }
    
    }
}