import axios from 'axios';

/*
    Em produção, esta comunicação será realizada através de "lambda invoke". Em desenvolvimento e enquanto a aplicação não é publicada,
    será utilizado o AXIOS e comunicação HTTP. 
*/

const isProduction = process.env.NODE_ENV === 'production';

export type SERVICES = 'AUTH_VERIFY_TOKEN';

export const SERVICE_INFO = {
    'AUTH_VERIFY_TOKEN': {
        name: 'Verificar validade de token no serviço de autenticação',
        endpoint: process.env.AUTH_VERIFY_TOKEN
    }
}
//TODO - Refatorar para utilizar lambda invoke de acordo com a necessidade
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