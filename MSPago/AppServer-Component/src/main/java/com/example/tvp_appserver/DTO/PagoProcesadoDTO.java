package com.example.tvp_appserver.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PagoProcesadoDTO {
    private Long compraId;
    private Long transaccionId;
    private String estado;
    private Double monto;
    private String correoCliente;
}
