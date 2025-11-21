package com.example.tvp_appserver.services;

import org.springframework.amqp.rabbit.core.RabbitTemplate;

import com.example.tvp_appserver.events.PagoProcesadoEvent;

public class PagoPublisherService {
    private final RabbitTemplate rabbitTemplate = new RabbitTemplate();

    public void publicarPagoProcesado(PagoProcesadoEvent event) {

        rabbitTemplate.convertAndSend(
                "pagos.exchange",        
                "pago.procesado",        
                event                    
        );
    }
}
