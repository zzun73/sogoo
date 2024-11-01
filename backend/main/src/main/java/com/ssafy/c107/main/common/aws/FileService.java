package com.ssafy.c107.main.common.aws;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String saveFile(MultipartFile multipartFile) {
        try {
            String originalFilename = multipartFile.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String uniqueFilename = UUID.randomUUID() + extension;

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(multipartFile.getSize());
            metadata.setContentType(multipartFile.getContentType());

            amazonS3.putObject(bucket, uniqueFilename, multipartFile.getInputStream(), metadata);
            return getFileUrl(uniqueFilename);

        } catch (IOException e) {
            throw new InvalidS3Exception(S3Exception.FILE_UPLOAD_FAILED);
        }
    }

    public String getFileUrl(String filename) {
        try {
            return amazonS3.getUrl(bucket, filename).toString();
        } catch (Exception e) {
            throw new InvalidS3Exception(S3Exception.FILE_NOT_FOUND);
        }
    }

    public void deleteFile(String filename) {
        try {
            amazonS3.deleteObject(bucket, filename);
        } catch (Exception e) {
            throw new InvalidS3Exception(S3Exception.FILE_DELETE_FAILED);
        }
    }
}
