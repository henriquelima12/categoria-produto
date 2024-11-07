export interface MenuBarItem {
    label: string;
    icon?: string;
    routerLink?: string;
    items?: MenuBarItem[];
}