package com.example.backend.common.beans;

import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.Storage.BlobTargetOption;
import com.google.cloud.storage.Storage.PredefinedAcl;
import com.google.cloud.storage.StorageOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
public class GoogleCloudStorageBean {

    private final String BUCKET_NAME = "careercompany";

    @Autowired
    Storage storage;

    public BlobInfo upload(MultipartFile file) {
        try {
            BlobInfo blobInfo = storage.create(
                    BlobInfo.newBuilder(BUCKET_NAME, file.getOriginalFilename()).build(), //get original file name
                    file.getBytes(), // the file
                    BlobTargetOption.predefinedAcl(PredefinedAcl.PUBLIC_READ) // Set file permission
            );
            return blobInfo;
        }catch(IllegalStateException | IOException e){
            throw new RuntimeException(e);
        }
    }
}