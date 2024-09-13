import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { JsDashboardComponent } from './js-dashboard/js-dashboard.component';
import { JobseekerComponent } from './jobseeker/jobseeker.component';
import { SearchComponent } from './search/search.component';
import { SidenavComponent } from './sidenav/sidenav.component';

const routes: Routes = [
  {path: '', component: FormComponent},
  {path: '',redirectTo: 'form', pathMatch: 'full'},
  {path: 'js-dashboard', component: JsDashboardComponent},
  {path: 'jobseeker', component: JobseekerComponent},
  {path: 'search', component: SearchComponent},
  {path: 'sidenav', component: SidenavComponent}
 ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
