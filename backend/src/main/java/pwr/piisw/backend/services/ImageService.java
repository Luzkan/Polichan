package pwr.piisw.backend.services;

import java.io.IOException;
import java.util.Objects;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import pwr.piisw.backend.models.Image;
import pwr.piisw.backend.repository.ImageRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageService {
  private final ImageRepo imageRepo;

  public Image store(MultipartFile file) throws IOException {
    String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
    Image image = new Image(fileName, file.getContentType(), file.getBytes());

    Image imageUrl = imageRepo.save(image);
    imageUrl.setImgUrl("/resources/" + image.getId());
    return imageRepo.save(imageUrl);
  }

  public Image getImage(String id) {
    return imageRepo.findById(id).get();
  }
}
