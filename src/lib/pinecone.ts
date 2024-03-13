import { Pinecone } from '@pinecone-database/pinecone';
import { downloadFromS3 } from './s3-server';
// import { FileKey } from 'lucide-react';
import {PDFLoader} from 'langchain/document_loaders/fs/pdf';

export const pc = new Pinecone({
    apiKey: '642cf0ea-2028-4d16-92cc-0daa088cbba0',
});

export async function loadS3IntoPinecone(file_key : string) {
    
    console.log("downloading s3 into the file system");
    const file_name = await downloadFromS3(file_key);
    if(!file_name){
        throw new Error("could not download from the s3 server");
    }
    const loader = new PDFLoader(file_name);
    const pages = loader.load();
    return pages
    
};