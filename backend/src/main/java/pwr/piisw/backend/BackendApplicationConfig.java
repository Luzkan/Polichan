package pwr.piisw.backend;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import pwr.piisw.backend.helper.DtoHelper;

@Configuration
public class BackendApplicationConfig {
  @Bean
  public ModelMapper modelMapper() {
    return new ModelMapper();
  }

  @Bean
  public DtoHelper dtoHelper() {
    return new DtoHelper(modelMapper());
  }
}
