package com.example.backend.api.util.gcs;

import com.google.cloud.storage.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;

@Service
@RequiredArgsConstructor
public class GCSService {

    @Autowired
    Storage storage;

    public Blob downloadFileFromGCS(GCSVo gcsVo) throws IOException {
        Blob blob = storage.get(gcsVo.getBucketName(), gcsVo.getDownloadFileName());
        blob.downloadTo(Paths.get(gcsVo.getLocalFileLocation()));
        return blob;
    }

    public BlobInfo updateFileToGCS(GCSVo gcsVo) throws IOException {

        BlobId blobId = BlobId.of(gcsVo.getBucketName(), gcsVo.getUploadFileName());
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                .setAcl(new ArrayList<>(Arrays.asList(Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER))))
                .build();

        Blob blob = storage.create(blobInfo);
        return blob;

    }

}
