import { Component, OnInit } from '@angular/core';
import { Member } from '../models/member.model';
import { MembersService } from '../services/members.service';



@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members : any = []
  val : any=[];

  constructor(private membersService: MembersService) { }

  ngOnInit(): void {
    //this.membersService.createMember(Object.assign({}, new Member("Linda", "Jacques")));
    this.membersService.getMembers().subscribe(res =>{
      this.members=[];
      var data : any;
      return res.map(a => {
        this.members.push({"id":a.payload.doc.id, "data": a.payload.doc.data()});
        //data = a.payload.doc.data() as Member;
        //const id = a.payload.doc.id;
        //return { id, ...data };
        //console.log(data);
      });
      //this.val=res;
      //console.log(this.val[0].payload.doc.data());
      //console.log(this.val[0].payload.doc);
      

    });
    //console.log(this.val);
    //this.membersService.deleteMember("IXZjcViHjvraamUbWOKK");
    this.membersService.updateMember(Object.assign({}, new Member("Ruth", "Jacques")),"SR061L0LwBTIT7wJwzc1")
  }

}
