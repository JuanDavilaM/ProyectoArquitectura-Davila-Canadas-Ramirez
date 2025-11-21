import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  private apiUrl = 'http://localhost:8080/api';   // base del MS-Pagos

  constructor(private http: HttpClient) { }


  crearCompra(cedula: string, numeroTarjeta: string){
    const params = new HttpParams()
    .set('cedula', cedula)
    .set('numeroTarjeta', numeroTarjeta);

    return this.http.post(`${this.apiUrl}/compras/crear`, null, { params });
  }

  // ----------------------------------------------------------
  // 🟦 CLIENTES
  // ----------------------------------------------------------

  listarClientes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clientes`);
  }

  obtenerClientePorCedula(cedula: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/clientes/${cedula}`);
  }

  crearCliente(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/clientes`, data);
  }

  actualizarCliente(cedula: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/clientes/${cedula}`, data);
  }

  eliminarCliente(cedula: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clientes/${cedula}`);
  }



  // ----------------------------------------------------------
  // 🟩 PAQUETES
  // ----------------------------------------------------------

  listarPaquetes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/paquetes`);
  }

  obtenerPaquete(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/paquetes/${id}`);
  }

  crearPaquete(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/paquetes`, data);
  }

  eliminarPaquete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/paquetes/${id}`);
  }



  // ----------------------------------------------------------
  // 🟦 TARJETAS
  // ----------------------------------------------------------

  crearTarjeta(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tarjetas`, data);
  }

  listarTarjetasPorCliente(cedula: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/tarjetas/cliente/${cedula}`);
  }

  recargarTarjeta(request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tarjetas/recargar`, request);
  }

  eliminarTarjeta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tarjetas/${id}`);
  }

  // ----------------------------------------------------------
  // 🟦 CARRITO
  // ----------------------------------------------------------

  crearCarrito(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/carrito`, data);
  }

  obtenerCarritoDeCliente(cedulaCliente: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/carrito/${cedulaCliente}`);
  }

  eliminarCarrito(cedulaCliente: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/carrito/${cedulaCliente}`);
  }

  pagarCarrito(cedulaCliente: string, numeroTarjeta: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/carrito/${cedulaCliente}/pagar`, {
      numeroTarjeta
    });
  }


  // ----------------------------------------------------------
  // 🟩 CARRITO ITEMS
  // ----------------------------------------------------------

  agregarItemAlCarrito(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/carrito-items`, data);
  }

  obtenerItemsPorCliente(cedulaCliente: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/carrito-items/${cedulaCliente}`);
  }

  eliminarItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/carrito-items/${id}`);
  }

}