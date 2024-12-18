import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {LayoutComponent} from "./common/ui/layout/layout.component";
import {ProjectsListComponent} from "./pages/projects/projects-list.component";
import {authGuard} from "./auth/auth.guard";
import {ProjectDetailsComponent} from "./pages/project-details/project-details.component";
import {ProjectTasksComponent} from "./pages/project-tasks/project-tasks.component";
import {TaskCreateComponent} from "./pages/task-create/task-create.component";

export const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            {path: 'projects', component: ProjectsListComponent},
            {path: 'projects/:id', component: ProjectDetailsComponent},
            {path: 'projects/:id/tasks', component: ProjectTasksComponent},
            {path: 'projects/:id/tasks/create', component: TaskCreateComponent},
        ],
        canActivate: [authGuard],
    },
    { path: 'login', component: LoginComponent }
];
