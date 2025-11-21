package com.example.mail.listener;

import java.util.Map;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.example.mail.config.RabbitConfig;
import com.example.mail.models.EmailDTO;
import com.example.mail.services.EmailServiceImplementation;

@Component
public class PagosListener {

    private final EmailServiceImplementation emailService;

    public PagosListener(EmailServiceImplementation emailService) {
        this.emailService = emailService;
    }

    @RabbitListener(queues = RabbitConfig.NOTIFICACION_COMPRA_QUEUE)
    public void recibirMensaje(Map<String, Object> dto) {

        try {
            System.out.println("JSON recibido desde Compras: " + dto);

            String correo = dto.get("correoCliente").toString();
            String estado = dto.get("estado").toString();
            Double monto = Double.valueOf(dto.get("monto").toString());

            String mensajeHTML = String.format(
                    "Hola,<br/><br/>" +
                    "Tu compra fue <strong>%s</strong>.<br>" +
                    "Valor total: <strong>$%,.2f</strong>.<br/><br/>" +
                    "Gracias por confiar en nosotros.",
                    estado, monto
            );

            EmailDTO emailDTO = new EmailDTO(
                    correo,
                    "Estado de tu compra",
                    mensajeHTML,
                    "no-reply@compras.com"
            );

            emailService.sendEmail(emailDTO);

            System.out.println("Correo enviado correctamente a " + correo);

        } catch (Exception e) {
            System.out.println("Error procesando mensaje de compras");
            e.printStackTrace();
        }
    }
}
