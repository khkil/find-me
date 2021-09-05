package com.example.backend.api.util.gcs;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/gcs")
public class GCSController {


    @Autowired
    GCSService gcsService;

    @PostMapping("/download")
    public ResponseEntity downloadFromStorage(@RequestBody GCSVo gcsVo) throws IOException {
        Blob fileFromGCS = gcsService.downloadFileFromGCS(gcsVo);
        return ResponseEntity.ok(fileFromGCS.toString());
    }

    @PostMapping("/upload")
    public ResponseEntity uploadFromStorage(@RequestBody GCSVo gcsVo) throws IOException {
        BlobInfo blobInfo = gcsService.updateFileToGCS(gcsVo);
        return ResponseEntity.ok(blobInfo);
    }
}
