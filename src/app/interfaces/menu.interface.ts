export interface MenuItem {
  title: string;
  icon: string;
  submenu: subMenuItem[];
}

export interface subMenuItem {
  title: string;
  url: string;
}
