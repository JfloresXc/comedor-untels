import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import * as moment from 'moment';
import { Register } from 'src/app/models/register.model';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { RegistersService } from 'src/app/services/register/registers.service';
import { UserService } from 'src/app/services/user/user.service';

interface Row {
  fecha: string;
  textListFood: string;
}

@Component({
  selector: 'app-user-registers',
  templateUrl: './user-registers.component.html',
  styleUrls: ['./user-registers.component.css'],
})
export class UserRegistersComponent implements OnInit {
  isLoading: boolean = false;
  @ViewChild(MatTable) tabla!: MatTable<Row>;
  registers: Row[] = [];
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

    this.registersService.registers$.subscribe((registers) => {
      this.showTable(registers);
    });

    this.showTable(this.registersService.registers);
  }

  showTable(registers: Register[]): void {
    const registersNow = registers.filter((register) => {
      return register.idUsuario === this.userService.user.id;
    });

    this.registers = registersNow.map((register) => {
      const row: Row = {
        fecha: moment(register.fecha).format('ll'),
        textListFood: '',
      };

      if (register.idDesayuno) row.textListFood = 'Desayuno';
      if (register.idAlmuerzo) row.textListFood = 'Almuerzo';
      if (register.idCena) row.textListFood = 'Cena';

      return row;
    });

    this.tabla?.renderRows();
  }
}
