package com.example.backend.mapper;

import com.example.backend.model.Result;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultMapper {

    List<Result> getResultList(int inspection_idx);

}
