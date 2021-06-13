package pwr.piisw.backend;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BackendApplicationConfig {
  @Bean
  public ModelMapper modelMapper() {
    return new ModelMapper();
  }
}
