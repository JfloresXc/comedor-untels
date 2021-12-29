import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { Register } from 'src/app/models/register.model';
import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  register$: BehaviorSubject<Register> = new BehaviorSubject<Register>(
    new Register()
  );
  register: Register = new Register();
  constructor(
    private firestore: AngularFirestore,
    private loadingService: LoadingService
  ) {}

  suscribeRegister() {
    this.register$.next(this.register);
  }

  addRegister(register: Register): Promise<any> {
    return this.firestore.collection('registers').add(register);
  }

  deleteRegister(id: string): Promise<any> {
    return this.firestore.collection('registers').doc(id).delete();
  }

  getRegister(id: string) {
    return this.firestore
      .collection('registers')
      .doc(id)
      .get()
      .subscribe((registerKey: any) => {
        const id = registerKey.id;

        if (registerKey.data()) {
          this.register$.next({ ...registerKey.data(), id });
          this.loadingService.hide();
        }
      });
  }

  updateRegister(id: string, data: any): Promise<any> {
    return this.firestore.collection('registers').doc(id).update(data);
  }

  clean() {
    this.register$.next(new Register());
    this.register = new Register();
  }
}
