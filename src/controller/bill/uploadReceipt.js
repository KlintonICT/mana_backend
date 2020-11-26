// import @azure blob storage sdk
import {
    BlobServiceClient,
    StorageSharedKeyCredential,
    newPipeline
} from '@azure/storage-blob'

import getStream from 'into-stream'

// determine STORAGE_ACCOUNT_NAME
// determine AZURE_STORAGE_ACCOUNT_ACCESS_KEY
// determine CONTAINER_NAME
const storageAccountName = process.env.STORAGE_ACCOUNT_NAME
const storageAccountAccessKey = process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY
const containerName = process.env.STORAGE_ACCOUNT_CONTAINER_NAME || 'receipt-image'

const ONE_MEGABYTE = 1024 * 1024
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 }

// Create Storage Account client with STORAGE_ACCOUNT_NAME and STORAGE_ACCESS_KEY
const sharedKeyCredential = new StorageSharedKeyCredential(
    storageAccountName,
    storageAccountAccessKey)
const pipeline = newPipeline(sharedKeyCredential)

const blobUrl = `https://${storageAccountName}.blob.core.windows.net`
const blobServiceClient = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net`,
    pipeline
)

const getBlobName = originalName => {
    // Use a random number to generate a unique file name, 
    // removing "0." from the start of the string.
    const identifier = Math.random().toString().replace(/0\./, '');
    return `${identifier}-${originalName}`;
}

const uploadImage = async (req, res) => {
    // Create if not exists container with CONTAINER_NAME
    
    const blobName = getBlobName(req.file.originalname)
    const stream = getStream(req.file.buffer)
    const containerClient = blobServiceClient.getContainerClient(containerName)
    const blockBlobClient = containerClient.getBlockBlobClient(blobName)

    try {
        // Do the Upload
        const response = await blockBlobClient.uploadStream(stream,
            uploadOptions.bufferSize, uploadOptions.maxBuffers,
            { blobHTTPHeaders: { blobContentType: 'image/jpeg' } })
        // res.render('success', { message: 'File uploaded to Azure Blob storage.' })
        res.json({
            status: 'success',
            url: `${blobUrl}/${containerName}/${blobName}`
            // response,
        })
    } catch (err) {
        // res.render('error', { message: err.message })
        res.json({
            status: 'error',
            error: err.message,
        })
    }
}

export default uploadImage
