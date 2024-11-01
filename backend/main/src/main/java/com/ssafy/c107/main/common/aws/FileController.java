package com.ssafy.c107.main.common.aws;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;

@RestController
@RequestMapping("/files")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    // 파일 업로드
    @PostMapping
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        String url = fileService.saveFile(file);
        return ResponseEntity.ok(url);
    }

    // 파일 다운로드 URL 반환
    @GetMapping("/{filename}")
    public ResponseEntity<UrlResource> downloadFile(@PathVariable String filename) throws MalformedURLException {
        UrlResource urlResource = new UrlResource(fileService.getFileUrl(filename));
        String contentDisposition = "attachment; filename=\"" + filename + "\"";

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                .body(urlResource);
    }

    // 파일 삭제
    @DeleteMapping("/{filename}")
    public ResponseEntity<String> deleteFile(@PathVariable String filename) {
        fileService.deleteFile(filename);
        return ResponseEntity.ok("파일 삭제 성공");
    }
}
