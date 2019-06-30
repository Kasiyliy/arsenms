import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AuthPage} from './auth.page';

const routes: Routes = [
    {
        path: '', component: AuthPage,
        children: [
            {path: '', component: LoginComponent},
            {path: 'register', component: RegisterComponent},
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
