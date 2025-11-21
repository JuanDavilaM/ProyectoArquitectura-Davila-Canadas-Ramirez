package com.example.tvp_appserver.events;

import com.example.tvp_appserver.DTO.PagoProcesadoDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PagoProcesadoEvent {
    private PagoProcesadoDTO pagoProcesado;
}
