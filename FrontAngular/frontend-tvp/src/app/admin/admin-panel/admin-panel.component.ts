import { Component } from '@angular/core';
import { PagosService } from '../../services/pagos.service';
import { JsonPipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-panel',
  imports: [JsonPipe, CommonModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {

  resultado: any;

  constructor(private pagos: PagosService) { }

  // ===================================================
  // 🟦 CLIENTES
  // ===================================================

  listarClientes() {
    this.pagos.listarClientes().subscribe(res => this.resultado = res);
  }

  buscarCliente() {
    const cedula = prompt("Ingrese cédula del cliente:");
    if (!cedula) return;

    this.pagos.obtenerClientePorCedula(cedula)
      .subscribe(res => this.resultado = res);
  }

  crearCliente() {
    const nombre = prompt("Ingrese el nombre del cliente:");
    if (!nombre) return;

    const cedula = prompt("Ingrese la cédula:");
    if (!cedula) return;

    const correo = prompt("Ingrese el correo:");
    if (!correo) return;

    const password = prompt("Ingrese la contraseña del cliente (para login):");
    if (!password) return;

    const nuevoCliente = {
      nombre,
      cedula,
      correo,
      password
    };

    this.pagos.crearCliente(nuevoCliente).subscribe({
      next: (res) => {
        this.resultado = res;
        alert("Cliente creado correctamente");
      },
      error: (err) => {
        console.error("ERROR", err);
        alert("Error creando cliente");
      }
    });
  }


  actualizarCliente() {
    const cedula = prompt("Cédula del cliente a actualizar:");
    if (!cedula) return;

    const nombre = prompt("Nuevo nombre:");
    const correo = prompt("Nuevo correo:");

    this.pagos.actualizarCliente(cedula, { nombre, correo })
      .subscribe(res => this.resultado = res);
  }

  eliminarCliente() {
    const cedula = prompt("Cédula del cliente a eliminar:");
    if (!cedula) return;

    this.pagos.eliminarCliente(cedula)
      .subscribe(res => this.resultado = "Cliente eliminado");
  }


  // ===================================================
  // 🟩 PAQUETES
  // ===================================================

  listarPaquetes() {
    this.pagos.listarPaquetes().subscribe(res => this.resultado = res);
  }

  obtenerPaquete() {
    const id = prompt("Ingrese ID del paquete:");
    if (!id) return;

    this.pagos.obtenerPaquete(Number(id))
      .subscribe(res => this.resultado = res);
  }

  crearPaquete() {
    const nombre = prompt("Nombre del paquete:");
    const precio = prompt("Precio:");
    const destino = prompt("Destino (separado por comas):");

    this.pagos.crearPaquete({
      nombre,
      precio,
      destino     
    }).subscribe(res => this.resultado = res);
  }

  eliminarPaquete() {
    const id = prompt("ID del paquete a eliminar:");
    if (!id) return;

    this.pagos.eliminarPaquete(Number(id))
      .subscribe(() => this.resultado = "Paquete eliminado");
  }

  // ===================================================
  // 🟦 CARRITO
  // ===================================================

  obtenerCarrito() {
    const cedulaCliente = prompt("cedula del cliente:");
    if (!cedulaCliente) return;

    this.pagos.obtenerCarritoDeCliente(String(cedulaCliente))
      .subscribe(res => this.resultado = res);
  }

  obtenerItemsCarrito() {
    const cedulaCliente = prompt("Cédula del dueño del carrito:");
    if (!cedulaCliente) return;

    this.pagos.obtenerItemsPorCliente(String(cedulaCliente))
      .subscribe(res => this.resultado = res);
  }



  recargarTarjeta() {
    const numero = prompt("Número de tarjeta:");
    const monto = prompt("Monto a recargar:");

    if (!numero || !monto) return;

    this.pagos.recargarTarjeta({ numeroTarjeta: numero, monto })
      .subscribe(res => this.resultado = res);
  }

  // ==================================================
  // 🟩 TARJETAS

  eliminarTarjeta() {
    const id = prompt("ID de la tarjeta a eliminar:");
    if (!id) return;

    this.pagos.eliminarTarjeta(Number(id))
      .subscribe(() => this.resultado = "Tarjeta eliminada");
  }

}
