package pwr.piisw.backend.helper;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileUploadHelper {

  public final String UPLOAD_DIR = ".\\backend\\src\\main\\java\\pwr\\piisw\\backend\\images";

  public String uploadFile(MultipartFile multipartFile) {
    try {
      Files.copy(
          multipartFile.getInputStream(),
          Paths.get(UPLOAD_DIR + File.separator + multipartFile.getOriginalFilename()),
          StandardCopyOption.REPLACE_EXISTING);
      return multipartFile.getOriginalFilename();
    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }
}
