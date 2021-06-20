package pwr.piisw.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pwr.piisw.backend.models.Image;

@Repository
public interface ImageRepo extends JpaRepository<Image, String> {}
