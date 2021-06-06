package pwr.piisw.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import pwr.piisw.backend.helper.FileUploadHelper;

@RestController
@RequestMapping("/api")
public class FileUploadResource {

    @Autowired
    private FileUploadHelper fileUploadHelper;

    @PostMapping("/resources")
    public ResponseEntity<String> uploadFile(@RequestParam("file")MultipartFile file){

        try {

            if (file.isEmpty()) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Request file");
            }

            if (!(file.getContentType().equals("image/jpeg") && file.getContentType().equals("image/png") && file.getContentType().equals("image/gif"))) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Only jpeg, jpg, png, gif");
            }

            boolean f = fileUploadHelper.uploadFile(file);
            if (f) {
                return ResponseEntity.ok("File is successfully uploaded");
            }
        }
        catch (Exception e) {
            e.printStackTrace();

        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
    }
}
