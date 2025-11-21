package com.example.tvp_appserver.DTO;

import java.util.List;

import lombok.Data;

@Data
public class SolicitudPagoDTO {
    private Long compraId;
    private Long clienteId;
    private String correoCliente;
    private Double monto;
    private Long tarjetaId;

    private List<TransaccionItemDTO> items;

    private Double saldoTarjeta;
}
