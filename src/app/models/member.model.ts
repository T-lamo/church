export class Member {
    sexe: string;
    dob: string;
    firstname: string;
    lastname: string;
    constructor(firstname:string, lastname: string, dob:string="",sexe:string="") {
        this.sexe =sexe;
        this.dob=dob;
        this.firstname=firstname;
        this.lastname =lastname;
    }
  }