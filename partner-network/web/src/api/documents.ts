import axios, { AxiosResponse } from "axios";
import { configWithAuth, makeHttpEndpoint } from ".";
import config from "../../config";

type CreateDocumentResponse = {
    documentPath: string, 
    details: string
}

export async function createDocument(document: Blob): Promise<AxiosResponse<CreateDocumentResponse>> {
    const formData = new FormData();
    formData.append("file", document);
    return axios.post(makeHttpEndpoint("documents"), formData, configWithAuth({
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }));
}

export function getDocumentUrl(documentPath: string): string {
    return config.API_URL + documentPath
}