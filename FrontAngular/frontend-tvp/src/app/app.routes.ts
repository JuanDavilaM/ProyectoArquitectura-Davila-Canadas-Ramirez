import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { ClientPanelComponent } from './client/client-panel/client-panel.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'cliente-panel', component: ClientPanelComponent },
    { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AdminGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
