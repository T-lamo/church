import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  memberForm : FormGroup=this.fb.group({
    firstname: new FormControl(""),
    lastname: new FormControl(""),
    dob: new FormControl(""),
    sexe: new FormControl("F")
  });

  constructor(private fb: FormBuilder,private membersService: MembersService) { }

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
    this.membersService.updateMember(Object.assign({}, new Member("Ruth", "Jacques")),"SR061L0LwBTIT7wJwzc1")
  }

  submit(){
  
    let m =new Member(this.memberForm.get("firstname")?.value,this.memberForm.get("lastname")?.value,this.memberForm.get("dob")?.value,this.memberForm.get("sexe")?.value)
    console.log(this.memberForm.get("firstname")?.value);
    console.log(this.memberForm.get("lastname")?.value);
    console.log(this.memberForm.get("dob")?.value);
    console.log(this.memberForm.get("sexe")?.value);
    this.membersService.createMember(Object.assign({}, m));


  }

  deleteMember(id:string=""){
        console.log("testing :"+ id);
        this.membersService.deleteMember(id);

  }
  updateMember(id:string=""){
    console.log("testing :"+ id);
    this.membersService.updateMember(Object.assign({}, new Member("Kinton", "Jonas")),id);
}

}
