import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AdminComponent } from "./admin.component";

import { SubdivisionComponent } from './subdivision/subdivision.component';
import { EmployeesComponent } from './employees/employees.component';
import { SickLeaveComponent } from './sick-leave/sick-leave.component';
import { AuthGuard } from "../shared/auth-guard.service";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: "admin",
                component: AdminComponent,
                // canActivate: [AuthGuard],
                children: [
                     {
                        path: "",
                        children: [
                            { path: "employees", component: EmployeesComponent },
                            { path: "subdivision", component: SubdivisionComponent },
                            { path: "sick-leave", component: SickLeaveComponent },
                            // { path: "holidays", component: HolidaysComponent },
                            // { path: "business-trip", component: BusinessTripComponent },
                            // { path: "hooky", component: HookyComponent },
                            { path: "", redirectTo: "employees", pathMatch: "full" }
                        ]
                    }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }