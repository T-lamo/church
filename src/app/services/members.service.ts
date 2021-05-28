import { Injectable } from '@angular/core';
import { Member } from '../models/member.model';
import { AngularFirestore } from '@angular/fire/firestore';   
import { AngularFireDatabase } from '@angular/fire/database';   

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  members: Member[] = [];
  membersSubject = new Subject<Member[]>();

  emitMembers() {
    this.membersSubject.next(this.members);
  }

  constructor(private firestore: AngularFirestore) { }
  // Store member data in firestore
  createMember(member: any){
    return this.firestore.collection('members').add(member);
  }

  // Retrive members data from firestore
  getMembers() {
    console.log(this.firestore.collection('members').snapshotChanges());
    return this.firestore.collection('members').snapshotChanges();
  }
  // Delete a record
deleteMember(memberId: string){
  this.firestore.doc('members/' + memberId).delete();
}

// Update member data
updateMember(member: Member, id : string){
  //delete member.id;
  this.firestore.doc('members/' + id).update(member);
}
}
