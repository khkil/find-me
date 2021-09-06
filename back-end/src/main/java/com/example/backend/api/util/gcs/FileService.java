package com.example.backend.api.util.gcs;

import com.example.backend.api.util.gcs.model.DownloadReq;
import com.example.backend.api.util.gcs.model.File;
import com.example.backend.common.beans.GoogleCloudStorageBean;
import com.google.cloud.storage.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class FileService {

    @Autowired
    Storage storage;

    @Autowired
    GoogleCloudStorageBean googleCloudStorageBean;

    public Blob downloadFileFromGCS(DownloadReq downloadReq) throws IOException {
        Blob blob = storage.get(downloadReq.getBucketName(), downloadReq.getDownloadFileName());
        blob.downloadTo(Paths.get(downloadReq.getLocalFileLocation()));
        return blob;
    }

    public File uploadFileFromGCS(MultipartFile multipartFile){

        BlobInfo blobInfo = googleCloudStorageBean.upload(multipartFile);
        String filePath = blobInfo.getMediaLink();
        String fileName = multipartFile.getName();

        return new File(fileName, filePath);



    }


}
