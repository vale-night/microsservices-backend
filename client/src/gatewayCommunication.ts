import axios from 'axios';

const isProduction = process.env.NODE_ENV === 'production';

export type SERVICES = 'USER';

export const SERVICE_INFO = {
    'USER': {
        name: 'Serviço de Usuário',
        endpoint: isProduction ? '' : 'http://localhost:3000/users'
    }
}

export const invokeService = async (serviceName: SERVICES, data: any, waitResponse = false) => {
    const service = getServiceInfo(serviceName);
    const request = sendDataToService(service.endpoint, data, waitResponse);
    return waitResponse ? (await request).data : request;
}

const sendDataToService = async (serviceEndpoint: string, data: any, waitResponse: boolean) => {
    const request = axios.post(serviceEndpoint, data);
    return waitResponse ? await request : request;
}

const getServiceInfo = (serviceName: string) => {
    return SERVICE_INFO[serviceName];
}