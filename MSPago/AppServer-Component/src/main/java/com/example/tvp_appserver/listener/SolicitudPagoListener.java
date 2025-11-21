package com.example.tvp_appserver.listener;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.example.tvp_appserver.events.SolicitudPagoEvent;
import com.example.tvp_appserver.services.PagoService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SolicitudPagoListener {

    private final PagoService pagoService;

    @RabbitListener(queues = "compras.solicitud.pago.queue")
    public void recibirSolicitudPago(SolicitudPagoEvent event) {
        pagoService.crearYProcesarTransaccion(event.getSolicitudPago());
    }
}
