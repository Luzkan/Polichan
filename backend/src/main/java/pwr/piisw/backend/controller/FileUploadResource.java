package pwr.piisw.backend.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import pwr.piisw.backend.helper.FileUploadHelper;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class FileUploadResource {

  private final FileUploadHelper fileUploadHelper;

  @PostMapping("/resources")
  public ResponseEntity<String> uploadFile(@RequestParam("image") MultipartFile file) {

    try {
      if (file.isEmpty()) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Request image");
      }

      List<String> types =
          Arrays.asList(
              "image/png", "image/jpeg", "image/gif"); // MINE Type and logger, save to database
      if (!types.contains(file.getContentType())) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Only jpeg, jpg, png, gif");
      }

      String response = fileUploadHelper.uploadFile(file);
      if (!response.isEmpty()) {
        return ResponseEntity.ok(response);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
  }
}