package com.ssafy.c107.main.common.aws;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileService {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.buckets.original}")
    private String originalBucket;

    @Value("${cloud.aws.s3.buckets.resized}")
    private String resizedBucket;

    @Value("${cloud.aws.region.static}")
    private String region;

    public String saveFile(MultipartFile multipartFile) {
        try {
            String originalFilename = multipartFile.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String uniqueFilename = UUID.randomUUID() + extension;

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(multipartFile.getSize());
            metadata.setContentType(multipartFile.getContentType());

            amazonS3.putObject(originalBucket, uniqueFilename, multipartFile.getInputStream(), metadata);
            return getOriginalFileUrl(uniqueFilename);

        } catch (IOException e) {
            throw new InvalidS3Exception(S3Exception.FILE_UPLOAD_FAILED);
        }
    }

    public String getOriginalFileUrl(String filename) {
        try {
            return amazonS3.getUrl(originalBucket, filename).toString();
        } catch (Exception e) {
            throw new InvalidS3Exception(S3Exception.FILE_NOT_FOUND);
        }
    }

    public void deleteFile(String filename) {
        try {
            amazonS3.deleteObject(originalBucket, filename);
        } catch (Exception e) {
            throw new InvalidS3Exception(S3Exception.FILE_DELETE_FAILED);
        }
    }

    public String getResizedFileUrl(String filename) {
        try {
            return amazonS3.getUrl(resizedBucket, filename).toString();
        } catch (Exception e) {
            // 리사이징 파일이 없을 경우 원본 파일 URL 반환
            return getOriginalFileUrl(filename);
        }
    }

    public String getAppropriateFileUrl(String originalUrl) {
        try {
            // 원본 URL에서 파일 이름 추출
            String filename = extractKeyFromPathStyleUrl(originalUrl);

            // 리사이즈된 파일이 존재하면 리사이즈된 URL 반환
            if (fileExists(resizedBucket, filename)) {
                return getResizedFileUrl(filename);
            }
        } catch (Exception e) {
            log.error("Error checking resized file: {}", e.getMessage());
        }

        // 리사이즈된 파일이 없으면 원본 URL 반환
        return originalUrl;
    }

    private boolean isOriginalBucket(String url) {
        return url.contains(originalBucket);
    }

    private String extractKeyFromPathStyleUrl(String url) {
        // Path-style URL에서 파일 키 추출
        String bucketUrlPrefix = String.format("https://s3.%s.amazonaws.com/%s/", region, originalBucket);
        if (url.startsWith(bucketUrlPrefix)) {
            return url.substring(bucketUrlPrefix.length());
        }
        throw new IllegalArgumentException("Invalid S3 Path-style URL: " + url);
    }

    private boolean fileExists(String bucketName, String key) {
        try {
            amazonS3.getObjectMetadata(bucketName, key);
            return true;
        } catch (Exception e) {
            return false; // 객체가 없으면 false 반환
        }
    }
}
