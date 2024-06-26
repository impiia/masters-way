import {ReactElement, useState} from "react";
import {Root as DialogRoot} from "@radix-ui/react-dialog";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Link} from "src/component/link/Link";
import {SidebarContent} from "src/component/sidebar/SidebarContent/SidebarContent";
import {SidebarTrigger} from "src/component/sidebar/SidebarTrigger/SidebarTrigger";
import styles from "src/component/sidebar/Sidebar.module.scss";

/**
 * Navigation link props.
 */
export interface MenuItemLink {

  /**
   * Navigation link path.
   */
  path: string;

  /**
   * Navigation link value.
   */
  value: string;

  /**
   * Link icon
   */
  icon?: JSX.Element;

  /**
   * Is link visible
   * @default false
   */
  isHidden?: boolean;
}

/**
 * Data attributes for cypress testing
 */
export interface CyContent {

  /**
   * Data attribute for cypress testing
   */
  dataCyOverlay?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCyClose?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCyContent?: string;

}

/**
 * Data attributes for cypress testing
 */
interface Cy {

  /**
   * Data attribute for cypress testing
   */
  dataCyTrigger?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCyContent?: CyContent;

}

/**
 * Sidebar props
 */
interface SidebarProps {

  /**
   * The element that triggers the Sidebar.
   */
  trigger: ReactElement<HTMLElement>;

  /**
   * List of available links from menu
   */
  linkList: MenuItemLink[];

  /**
   * Bottom element
   */
  bottomChildren: React.ReactNode;

  /**
   * Data attributes for cypress testing
   */
  cy?: Cy;

}

/**
 * Renders navigation links based on the provided navigationLinks array.
 */
const renderNavigationLinks = (navigationLinks: (MenuItemLink)[]) => {
  return navigationLinks.map((item) => (
    !item.isHidden && (
      <HorizontalContainer
        key={item.value}
        className={styles.menuItem}
      >
        <Link
          path={item.path}
          className={styles.menuItemLink}
        >
          {item.icon}
          {item.value}
        </Link>
      </HorizontalContainer>
    )
  ));
};

/**
 * Sidebar component
 */
export const Sidebar = (props: SidebarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <DialogRoot
      open={open}
      onOpenChange={setOpen}
    >
      <SidebarTrigger dataCyTrigger={props.cy?.dataCyTrigger}>
        {props.trigger}
      </SidebarTrigger>

      <SidebarContent
        dataCyContent={props.cy?.dataCyContent}
        onClick={() => setOpen(false)}
        className={styles.sidebarContent}
      >
        <div className={styles.navSidebarContent}>
          {renderNavigationLinks(props.linkList)}
        </div>

        {props.bottomChildren}
      </SidebarContent>
    </DialogRoot>
  );
};
