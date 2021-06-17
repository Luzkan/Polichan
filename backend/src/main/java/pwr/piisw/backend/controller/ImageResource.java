package pwr.piisw.backend.controller;

import java.io.IOException;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import pwr.piisw.backend.dto.ImageDto;
import pwr.piisw.backend.models.Image;
import pwr.piisw.backend.services.ImageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("resources")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:8081")
public class ImageResource {
  private final ImageService imageService;
  private final ModelMapper modelMapper;

  @GetMapping("/{id}")
  public ResponseEntity<byte[]> getImage(@PathVariable String id) {
    Image image = imageService.getImage(id);
    return ResponseEntity.ok()
        .contentType(MediaType.parseMediaType(image.getType()))
        .body(image.getData());
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  @ResponseBody
  public ImageDto uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
    Image uploadedImage = imageService.store(file);
    return convertImageToDto(uploadedImage);
  }

  private ImageDto convertImageToDto(Image image) {
    return modelMapper.map(image, ImageDto.class);
  }
}
