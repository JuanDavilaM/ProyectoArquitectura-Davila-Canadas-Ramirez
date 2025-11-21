package com.example.tvp_appserver.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "transaccion_items")
@Data
public class TransaccionItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long paqueteId;    
    private Double precio;     

    @ManyToOne
    @JoinColumn(name = "transaccion_id")
    private Transaccion transaccion;
}

