package com.example.backend.api.util.gcs;

import com.google.cloud.storage.Blob;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/gcs")
public class GCSController {


    @Autowired
    GCSService gcsService;

    @PostMapping("/download")
    public ResponseEntity downloadFromStorage(@RequestBody GCSVo gcsVo){
        Blob fileFromGCS = gcsService.downloadFileFromGCS(gcsVo);
        return ResponseEntity.ok(fileFromGCS.toString());
    }
}
