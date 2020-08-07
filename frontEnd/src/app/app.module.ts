import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegistroComponent } from './components/login-registro/login-registro.component';
import { TestComponentComponent } from './components/test-component/test-component.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

import { AuthGuard } from "./guard/auth.guard";
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { FoldersComponent } from './components/folders/folders.component';
import { LinksComponent } from './components/links/links.component';
import { Page404Component } from './components/page404/page404.component';
import { AddFolderComponent } from './components/add-folder/add-folder.component';
import { HighlightDirective } from './directives/highlight.directive';
import { EditFolderComponent } from './components/edit-folder/edit-folder.component';
import { EditLinkComponent } from './components/edit-link/edit-link.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    LoginRegistroComponent,
    TestComponentComponent,
    LoginFormComponent,
    RegisterFormComponent,
    FoldersComponent,
    LinksComponent,
    Page404Component,
    AddFolderComponent,
    HighlightDirective,
    EditFolderComponent,
    EditLinkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [
    AuthGuard,{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
