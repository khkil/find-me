package com.example.backend.api.util.gcs;

import com.example.backend.api.util.gcs.model.DownloadReq;
import com.example.backend.common.CommonResponse;
import com.example.backend.common.beans.GoogleCloudStorageBean;
import com.google.cloud.storage.Blob;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/file")
public class FileController {


    @Autowired
    FileService gcsService;

    @PostMapping("/download")
    public ResponseEntity downloadFromStorage(@RequestBody DownloadReq downloadReq) throws IOException {
        Blob fileFromGCS = gcsService.downloadFileFromGCS(downloadReq);
        return ResponseEntity.ok(fileFromGCS.toString());
    }

    @PostMapping("/upload")
    public ResponseEntity uploadFromStorage(@RequestParam MultipartFile file) {
        return ResponseEntity.ok(CommonResponse.successResult(gcsService.uploadFileFromGCS(file)));
    }
}
