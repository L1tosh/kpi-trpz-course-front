export interface ISidebarCategory {
    name: string;
    icon: string;
    route: string;
    subcategories?: ISidebarSubcategory[];
}

export interface ISidebarSubcategory {
    name: string;
    route: string;
}