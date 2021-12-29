import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import * as moment from 'moment';
import { Register } from 'src/app/models/register.model';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { RegisterService } from 'src/app/services/register/register.service';
import { RegistersService } from 'src/app/services/register/registers.service';
import { UserService } from 'src/app/services/user/user.service';

class Row {
  fecha: string = '';
  textListFood: string = '';
}

@Component({
  selector: 'app-user-registers',
  templateUrl: './user-registers.component.html',
  styleUrls: ['./user-registers.component.css'],
})
export class UserRegistersComponent implements OnInit {
  isLoading: boolean = false;
  @ViewChild(MatTable) tabla!: MatTable<Row>;
  registers: any[] = [];
  displayedColumns: string[] = ['fecha', 'textListFood'];

  constructor(
    private registersService: RegistersService,
    private userService: UserService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.loading$.subscribe((isLoadingKey) => {
      this.isLoading = isLoadingKey;
    });

    this.registersService.registers$.subscribe((registersKey) => {
      this.showTable(registersKey);
    });

    this.showTable(this.registersService.registers);
  }

  showTable(registers: Register[]) {
    const registersNow = registers.filter((registerKey: Register) => {
      return (registerKey.idUsuario = this.userService.user.id);
    });

    this.registers = registersNow.map((registerKey) => {
      const row = new Row();
      const { idDesayuno, idAlmuerzo, idCena, fecha } = registerKey;
      if (idDesayuno) row.textListFood = 'Desayuno';
      if (idAlmuerzo) row.textListFood = 'Almuerzo';
      if (idCena) row.textListFood = 'Cena';

      row.fecha = moment(fecha).format('ll');
      return row;
    });

    this.tabla?.renderRows();
  }
}
