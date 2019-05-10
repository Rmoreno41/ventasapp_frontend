import { Component, OnInit } from '@angular/core';
import { ProductoService } from './../../../_services/producto.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Producto } from 'src/app/_model/producto';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-producto-edicion',
  templateUrl: './producto-edicion.component.html',
  styleUrls: ['./producto-edicion.component.css']
})
export class ProductoEdicionComponent implements OnInit {

  form: FormGroup; // formulario con el que se trabaja en html
  edicion: boolean;
  id: number;
  producto: Producto;
  constructor(private productoService: ProductoService, private router: Router, public route: ActivatedRoute ) { }

  ngOnInit() {
    this.producto = new Producto();
    this.form = new FormGroup({
    'id' : new FormControl(0),
    'nombre': new FormControl(''),
    'marca': new FormControl('')


    });
    this.route.params.subscribe((params: Params) =>{
      this.id = params['id'];
      this.edicion = this.id != null;
      this. initForm();
    });
  }
  initForm(){
    if (this.edicion){
      this.productoService.listarPorId(this.id).subscribe(data =>{
        this.form = new FormGroup({
          'id' : new FormControl(data.idProducto),
          'nombre' : new FormControl(data.nombre),
          'marca' : new FormControl(data.marca)
        });
      });
    }
  }

  operar(){
    this.producto.idProducto = this.form.value['id'];
    this.producto.nombre = this.form.value['nombre'];
    this.producto.marca = this.form.value['marca'];

    if(this.edicion) {
      this.productoService.modificar(this.producto).subscribe();
      this.productoService.listar().subscribe(data =>{
        this.productoService.productoCambio.next(data);
        this.productoService.productoMensaje.next("Registro Modificado");
      });
    }else{
      this.productoService.registrar(this.producto).subscribe();
      this.productoService.listar().subscribe(data => {
        this.productoService.productoCambio.next(data);
        this.productoService.productoMensaje.next("Registro Insertado");
      });
    }

    this.router.navigate(['producto']);



  }

}

