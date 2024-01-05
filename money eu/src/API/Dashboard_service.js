import axios from 'axios';
import {server_url} from './../constants';
import instance from './axios_instance';
export default class DashboardService{
    
    reportsByCurrency(bodyJson){
        return instance.post(server_url+`ordersreports/filter`, bodyJson);
    }
}