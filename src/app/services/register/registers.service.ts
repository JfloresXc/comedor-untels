import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';
import { Register } from 'src/app/models/register.model';
import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root',
})
export class RegistersService {
  registers$: Subject<Register[]> = new Subject<Register[]>();
  registers: Register[] = [];
  loading: boolean = true;

  constructor(
    private firestore: AngularFirestore,
    private loadingService: LoadingService
  ) {
    this.loadingService.show();
    this.firestore
      .collection('registers')
      .snapshotChanges()
      .subscribe((registersKey = []) => {
        this.registers = [];
        registersKey.forEach((key: any) => {
          this.registers.push({
            ...key.payload.doc.data(),
            id: key.payload.doc.id,
          });
        });
        this.sortRegisters();

        this.registers$.next(this.registers);
        this.loadingService.hide();
      });
  }

  sortRegisters() {
    let registerAux;

    for (let i = 0; i < this.registers.length; i++) {
      for (let j = 0; j < this.registers.length - 1; j++) {
        if (this.registers[j].fecha < this.registers[j + 1].fecha) {
          registerAux = this.registers[j];
          this.registers[j] = this.registers[j + 1];
          this.registers[j + 1] = registerAux;
        }
      }
    }
  }
}
