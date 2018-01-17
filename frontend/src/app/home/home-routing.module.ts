import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { HomeComponent } from "./home.component";
import { ReportComponent } from './report/report.component';
import { EmploSubComponent } from './emplo-sub/emplo-sub.component';

@NgModule({
    imports: [RouterModule.forRoot([
        {
            path: "",
            redirectTo: "home",
            pathMatch: "full"
        },
        {
            path: "home", component: HomeComponent,
            children: [
                {
                    path: "",
                    children: [
                        { path: "report", component: ReportComponent },
                        { path: "employees-subdivisions", component: EmploSubComponent },    
                        { path: "", redirectTo: "report", pathMatch: "full" }
                    ]
                }
            ]
        }
    ])],
    exports: [RouterModule] 
})
export class HomeRoutingModule { }