import { Component } from '@angular/core';
import { PagosService } from '../../services/pagos.service';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-client-panel',
  imports: [JsonPipe, CommonModule],
  templateUrl: './client-panel.component.html',
  styleUrl: './client-panel.component.css'
})
export class ClientPanelComponent {

  resultado: any;

  constructor(private pagos: PagosService) { }

  crearCompra() {
    const cedula = prompt("Ingrese su cédula:");
    const numeroTarjeta = prompt("Ingrese su número de tarjeta:");
    if (!cedula || !numeroTarjeta) return;
    this.pagos.crearCompra(cedula, numeroTarjeta)
      .subscribe(res => this.resultado = res);
  }

  // ============================================
  // 🟦 PAQUETES
  // ============================================
  listarPaquetes() {
    this.pagos.listarPaquetes().subscribe(res => this.resultado = res);
  }


  // ============================================
  // 🟩 TARJETAS
  // ============================================

  listarTarjetas() {
    const cedula = localStorage.getItem('cedula') || prompt("Ingrese su cédula:");
    if (!cedula) return;

    this.pagos.listarTarjetasPorCliente(cedula)
      .subscribe(res => this.resultado = res);
  }

  crearTarjeta() {
    const cedula = localStorage.getItem('cedula') || prompt("Ingrese su cédula:");

    const numeroTarjeta = prompt("Número de tarjeta (16 dígitos):");
    const tipo = prompt("Tipo de tarjeta (DEBITO / CREDITO):");
    const fechaVencimiento = prompt("Fecha de vencimiento (YYYY-MM-DD):");

    if (!cedula || !numeroTarjeta || !tipo || !fechaVencimiento) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const body = {
      cedulaCliente: cedula,
      numeroTarjeta: numeroTarjeta,
      tipo: tipo,
      fechaVencimiento: fechaVencimiento
    };

    this.pagos.crearTarjeta(body).subscribe({
      next: (res) => {
        this.resultado = res;
        alert("Tarjeta creada correctamente");
      },
      error: (err) => {
        console.error("ERROR", err);
        alert("Error al crear tarjeta");
      }
    });
  }

  // ============================================
  // 🟦 CARRITO
  // ============================================

  crearCarrito() {
    const cedulaCliente = prompt("Ingrese su cedula:");

    if (!cedulaCliente) return;

    this.pagos.crearCarrito({ cedulaCliente })
      .subscribe(res => this.resultado = res);
  }

  agregarItemCarrito() {
  const cedulaCliente = prompt("Danos tu cedula para acceder a tu carrito:");
  const nombrePaquete = prompt("Nombre del paquete/producto a agregar:");
  const cantidad = prompt("Cantidad:");

  if (!cedulaCliente || !nombrePaquete || !cantidad) return;

  this.pagos.agregarItemAlCarrito({
    cedulaCliente,
    nombrePaquete,
    cantidad
  }).subscribe(res => this.resultado = res);
}


  eliminarCarrito() {
    const cedulaCliente = prompt("cedulaCliente del carrito a eliminar:");
    if (!cedulaCliente) return;

    this.pagos.eliminarCarrito(String(cedulaCliente))
      .subscribe(() => this.resultado = "Carrito eliminado");
  }

  eliminarItem() {
    const id = prompt("ID del item a eliminar:");
    if (!id) return;

    this.pagos.eliminarItem(Number(id))
      .subscribe(() => this.resultado = "Item eliminado");
  }

  pagarCarrito() {
    const cedula = prompt("Ingrese su cédula:");
    const tarjeta = prompt("Ingrese su tarjeta:");

    this.pagos.pagarCarrito(cedula!, tarjeta!)
      .subscribe(res => this.resultado = res);
  }

}