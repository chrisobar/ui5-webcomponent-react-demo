import {
  Icon,
  Input,
  InputDomRef,
  List,
  ListItemStandard,
  PopoverDomRef,
  ResponsivePopover,
  ShellBar,
  ShellBarItem,
  ShellBarItemPropTypes,
  Ui5CustomEvent,
} from "@ui5/webcomponents-react";

import * as React from "react";
import "@ui5/webcomponents-icons/dist/search";
import "@ui5/webcomponents-icons/dist/palette";
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme";

const themesData = [
  { name: "sap_horizon", description: "SAP Horizon" },
  { name: "sap_horizon_dark", description: "SAP Horizon Dark" },
  { name: "sap_fiori_3", description: "Quartz Light" },
  { name: "sap_fiori_3_dark", description: "Quartz Dark" },
  { name: "sap_horizon_hcw", description: "SAP Horizon Contrast" },
  { name: "sap_horizon_hcb", description: "SAP Horizon Dark Contrast" },
  { name: "sap_fiori_3_hcw", description: "Quartz Light Contrast" },
  { name: "sap_fiori_3_hcb", description: "Quartz Dark Contrast " },
];

interface IHeaderProps {
  onSearchNotes: (e: Ui5CustomEvent<InputDomRef, never>) => void;
}

export default function Header({ onSearchNotes }: IHeaderProps) {
  const buttonThemeRef = React.useRef<PopoverDomRef | null>(null);
  const [currentTheme, setCurrentTheme] = React.useState<string>("sap_horizon");
  const [toggleThemePopUp, setToggleThemePopUp] =
    React.useState<boolean>(false);

  const onTogglePopOver: ShellBarItemPropTypes["onClick"] = (e) => {
    buttonThemeRef.current!.opener = e.detail.targetRef;
    setToggleThemePopUp(!toggleThemePopUp);
  };

  return (
    <>
      {" "}
      <ShellBar
        primaryTitle="My Notes"
        secondaryTitle="Demo"
        logo={
          <img
            src="https://raw.githubusercontent.com/SAP/ui5-webcomponents-react/main/assets/Logo-Sticker.png"
            alt="ui5-logo-react-webcomponent"
            className=""
            width=""
          />
        }
        searchField={
          <Input
            icon={<Icon name="search" />}
            placeholder="Search notes"
            onChange={onSearchNotes}
          />
        }
      >
        <ShellBarItem onClick={onTogglePopOver} icon="palette" text="Themes" />
      </ShellBar>
      <ResponsivePopover
        ref={buttonThemeRef}
        open={toggleThemePopUp}
        headerText="Available Themes:"
      >
        <List>
          {themesData.map((theme) => (
            <ListItemStandard
              key={theme.name}
              onClick={() => {
                setCurrentTheme(theme.name);
                setTheme(theme.name);
                setToggleThemePopUp(!toggleThemePopUp);
              }}
              selected={currentTheme === theme.name}
              icon="palette"
            >
              {theme.description}
            </ListItemStandard>
          ))}
        </List>
      </ResponsivePopover>
    </>
  );
}

// function onSelectTheme() {}
