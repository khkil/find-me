package com.example.backend.api.util.gcs;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Storage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class GCSService {

    @Autowired
    Storage storage;

    public Blob downloadFileFromGCS(GCSVo gcsVo) {
        Blob blob = storage.get(gcsVo.getBucketName(), gcsVo.getDownloadFileName());
        blob.downloadTo(Paths.get(gcsVo.getLocalFileLocation()));
        return blob;
    }


}
