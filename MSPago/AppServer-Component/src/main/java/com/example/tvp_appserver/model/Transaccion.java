package com.example.tvp_appserver.model;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "transacciones")
@Data
public class Transaccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long compraId;         
    private Long clienteId;        
    private Double montoTotal;     

    @Enumerated(EnumType.STRING)
    private Estado estado; 
   

    private Long tarjetaId;        

    private String correoCliente;  

    @OneToMany(mappedBy = "transaccion", cascade = CascadeType.ALL)
    private List<TransaccionItem> items;
}