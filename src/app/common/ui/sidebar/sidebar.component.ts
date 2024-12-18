import {Component} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {categories as data} from "../../../data/sidebar.categories";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        NgForOf,
        NgClass,
        NgIf
    ],
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
    categories: {
        name: string;
        icon: SafeHtml;
        route: string;
        subcategories?: any[];
        expanded?: boolean
    }[] = data.map(category => ({
        ...category,
        icon: this.sanitizer.bypassSecurityTrustHtml(category.icon) as SafeHtml,
        route: category.route,
        expanded: false
    }));

    constructor(private sanitizer: DomSanitizer, private router: Router) {
    }

    navigateToCategory(route: string) {
        this.router.navigate([route]);
    }

    toggleSubcategories(category: any) {
        category.expanded = !category.expanded;
    }
}
