package com.example.tvp_appserver.config;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    @Bean
    public DirectExchange comprasExchange() {
        return new DirectExchange("compras.exchange");
    }

    @Bean
    public DirectExchange pagosExchange() {
        return new DirectExchange("pagos.exchange");
    }

    @Bean
    public Queue solicitudPagoQueue() {
        return new Queue("compras.solicitud.pago.queue", true);
    }

    @Bean
    public Queue pagoProcesadoQueue() {
        return new Queue("pago.procesado.queue", true);
    }

    @Bean
    public Binding bindingSolicitudPago() {
        return BindingBuilder
                .bind(solicitudPagoQueue())
                .to(comprasExchange())
                .with("compra.solicitud.pago");
    }

    @Bean
    public Binding bindingPagoProcesado() {
        return BindingBuilder
                .bind(pagoProcesadoQueue())
                .to(pagosExchange())
                .with("pago.procesado");
    }


    @Bean
    public Jackson2JsonMessageConverter jackson2MessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public AmqpTemplate amqpTemplate(org.springframework.amqp.rabbit.connection.ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jackson2MessageConverter());
        return rabbitTemplate;
    }

}

