import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { LoadingService } from '../loading/loading.service';
import { db } from 'src/app/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User = new User();
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(new User());

  constructor(
    private firestore: AngularFirestore,
    private loadingService: LoadingService
  ) {}

  public suscribeUser(user: User | any) {
    this.user$.next(user);
    this.user = user;
  }

  async addUser(user: User, uid: any): Promise<any> {
    const docRef = doc(db, `users/${uid}`);
    await setDoc(docRef, { ...user });
  }

  deleteUser(id: string): Promise<any> {
    return this.firestore.collection('users').doc(id).delete();
  }

  getUser(id: string) {
    return this.firestore
      .collection('users')
      .doc(id)
      .get()
      .subscribe((userKey: any) => {
        const id = userKey.id;

        if (userKey.data()) {
          const { id, email, rol } = userKey.data();
          this.suscribeUser({ id, email, rol });
          this.loadingService.hide();
        }
      });
  }

  async getUserChange(id: string) {
    const refUser = doc(db, `users/${id}`);
    const user = await getDoc(refUser);
    return user.data();
  }

  updateUser(id: string, user: User): Promise<any> {
    return this.firestore.collection('users').doc(id).update(user);
  }
}
