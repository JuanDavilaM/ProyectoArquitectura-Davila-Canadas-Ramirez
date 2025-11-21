package com.example.tvp_appserver.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import com.example.tvp_appserver.DTO.PagoProcesadoDTO;
import com.example.tvp_appserver.DTO.SolicitudPagoDTO;
import com.example.tvp_appserver.DTO.TransaccionItemDTO;
import com.example.tvp_appserver.events.PagoProcesadoEvent;
import com.example.tvp_appserver.model.Estado;
import com.example.tvp_appserver.model.Transaccion;
import com.example.tvp_appserver.model.TransaccionItem;
import com.example.tvp_appserver.repository.TransaccionItemRepository;
import com.example.tvp_appserver.repository.TransaccionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PagoService {

    private final TransaccionRepository transaccionRepository;
    private final TransaccionItemRepository itemRepository;
    private final RabbitTemplate rabbitTemplate;


    public void crearYProcesarTransaccion(SolicitudPagoDTO solicitud) {

        Transaccion transaccion = new Transaccion();
        transaccion.setCompraId(solicitud.getCompraId());
        transaccion.setClienteId(solicitud.getClienteId());
        transaccion.setCorreoCliente(solicitud.getCorreoCliente());
        transaccion.setMontoTotal(solicitud.getMonto());
        transaccion.setTarjetaId(solicitud.getTarjetaId());
        transaccion.setEstado(Estado.PENDIENTE);

        transaccionRepository.save(transaccion);

        List<TransaccionItem> items = new ArrayList<>();

        for (TransaccionItemDTO dto : solicitud.getItems()) {
            TransaccionItem item = new TransaccionItem();
            item.setPaqueteId(dto.getPaqueteId());
            item.setPrecio(dto.getPrecio());
            item.setTransaccion(transaccion);
            items.add(item);
        }

        itemRepository.saveAll(items);
        transaccion.setItems(items);

        procesarPago(transaccion, solicitud.getSaldoTarjeta());
    }


    public void procesarPago(Transaccion transaccion, Double saldoTarjeta) {

        transaccion.setEstado(Estado.PENDIENTE);

        boolean aprobado = saldoTarjeta >= transaccion.getMontoTotal();

        if (aprobado) {
            transaccion.setEstado(Estado.APROBADA);
        } else {
            transaccion.setEstado(Estado.RECHAZADA);
        }

        transaccionRepository.save(transaccion);

        PagoProcesadoDTO dto = new PagoProcesadoDTO(
                transaccion.getCompraId(),
                transaccion.getId(),
                transaccion.getEstado().toString(),
                transaccion.getMontoTotal(),
                transaccion.getCorreoCliente()
        );

        rabbitTemplate.convertAndSend(
                "pagos.exchange",
                "pago.procesado",
                new PagoProcesadoEvent(dto)
        );
    }
}
