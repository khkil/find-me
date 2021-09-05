package com.example.backend.api.util.gcs;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class GCSVo {
    private String bucketName;
    private String downloadFileName;
    private String UploadFileName;
    private String localFileLocation;
}
