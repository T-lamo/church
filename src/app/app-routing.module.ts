import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { MemberListComponent } from './member-list/member-list.component';
import { SingleMemberComponent } from './member-list/single-member/single-member.component';
import { MemberFormComponent } from './member-list/member-form/member-form.component';
import { HeaderComponent } from './header/header.component';

//const routes: Routes = [];
const routes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'members', component: MemberListComponent },
  { path: 'members/new', component: MemberFormComponent },
  { path: 'members/view/:id', component: SingleMemberComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
