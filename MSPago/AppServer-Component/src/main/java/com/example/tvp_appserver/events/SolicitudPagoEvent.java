package com.example.tvp_appserver.events;

import com.example.tvp_appserver.DTO.SolicitudPagoDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SolicitudPagoEvent {
    private SolicitudPagoDTO solicitudPago;
}
