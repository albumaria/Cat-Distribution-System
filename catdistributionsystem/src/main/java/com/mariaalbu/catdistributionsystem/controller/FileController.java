package com.mariaalbu.catdistributionsystem.controller;

import com.mariaalbu.catdistributionsystem.model.Cat;
import com.mariaalbu.catdistributionsystem.service.CatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/files")
public class FileController {

    private final CatService catService;

    @Autowired
    public FileController(CatService catService) {
        this.catService = catService;
    }

    @GetMapping("/download/cat-image/{id}")
    public ResponseEntity<byte[]> downloadCatImage(@PathVariable UUID id) {
        try {
            Optional<Cat> catOptional = catService.getCatById(id);
            if (catOptional.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            Cat cat = catOptional.get();
            String imageUrl = cat.getImage();

            URL url = new URL(imageUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("User-Agent", "Mozilla/5.0");
            connection.connect();

            String contentType = connection.getContentType(); // like image/gif
            String extension = getExtensionFromContentType(contentType);

            try (InputStream inputStream = connection.getInputStream()) {
                byte[] imageBytes = inputStream.readAllBytes();

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.parseMediaType(contentType));

                String safeFileName = cat.getName().replaceAll("[^a-zA-Z0-9.-]", "_");
                String filename = safeFileName + "." + extension;
                headers.setContentDispositionFormData("attachment", filename);

                return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private String getExtensionFromContentType(String contentType) {
        switch (contentType) {
            case "image/jpeg": return "jpg";
            case "image/png": return "png";
            case "image/gif": return "gif";
            case "image/webp": return "webp";
            case "video/mp4": return "mp4";
            default: return "bin";
        }
    }

    @GetMapping("/download/cat-app")
    public ResponseEntity<byte[]> downloadCatApp() {
        try {
            // Replace this path with the actual path to your EXE file
            Path filePath = Paths.get("D:\\Cat-Distribution-System-React-App\\catdistributionsystem\\src\\main\\java\\com\\mariaalbu\\catdistributionsystem\\downloads\\StarUML Setup 6.3.1.exe");
            byte[] fileBytes = Files.readAllBytes(filePath);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", "cat-app.exe");

            return new ResponseEntity<>(fileBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}