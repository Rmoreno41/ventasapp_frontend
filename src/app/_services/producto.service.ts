import { Injectable } from '@angular/core';
import { Producto } from '../_model/Producto';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productoCambio = new Subject<Producto[]>(); // programacion Reactiva para notificar al padre que cambio la lista
  productoMensaje = new Subject<string>(); // programacion reactiva para los mensajes de insercion,modificacion y eliminacion
  url: string = `${environment.HOST_URL}/productos`;
    constructor(private http: HttpClient ){ }

    listar() {
      return this.http.get<Producto[]>(this.url);
    }

    listarPorId(idProducto: number) {
      return this.http.get<Producto>(`${this.url}/${idProducto}`);
    }
    registrar(producto: Producto){
      return this.http.post(`${this.url}`, producto);
      }
    modificar(producto: Producto){
      return this.http.put(`${this.url}`, producto);
    }
    eliminar(idProducto: number){
      return this.http.delete(`${this.url}/${idProducto}`);
    }

}
