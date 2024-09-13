import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobseekerComponent } from './jobseeker/jobseeker.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './form/form.component';
import { JsDashboardComponent } from './js-dashboard/js-dashboard.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SearchComponent } from './search/search.component';
import { JobsappliedComponent } from './jobsapplied/jobsapplied.component';

@NgModule({
  declarations: [
    AppComponent,
    JobseekerComponent,
    FormComponent,
    JsDashboardComponent,
    SidenavComponent,
    SearchComponent,
    JobsappliedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
