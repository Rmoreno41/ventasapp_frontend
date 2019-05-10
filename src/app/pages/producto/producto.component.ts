import { Component, OnInit ,ViewChild} from '@angular/core';
import { ProductoService } from 'src/app/_services/producto.service';
import { Producto} from 'src/app/_model/producto';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  displayedColumuns = ['idProducto', 'nombre', 'marca', 'acciones'];
  dataSource: MatTableDataSource<Producto>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productoService: ProductoService, private snackBar: MatSnackBar,public route: ActivatedRoute) { }

  ngOnInit() {
    this.productoService.productoCambio.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.productoService.productoMensaje.subscribe(data => {
      this.snackBar.open(data, 'INFO' , {
        duration:2000
      });
    });

    this.productoService.listar().subscribe(data => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminar(idEspecialidad: number) {
    this.productoService.eliminar(idEspecialidad).subscribe(() => {
      this.productoService.listar().subscribe(data => {
        this.productoService.productoCambio.next(data);
        this.productoService.productoMensaje.next('Registro Eliminado');
      });
    });
  }




}

