import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {toggleSidebar} from "../../store";
import {MenuProps} from "../Menu";
import {Container, Menu} from "semantic-ui-react";
import * as logo from "../../images/icon_75.png";
import {withPrefix} from "../../gatsby-utils";

interface HeaderMenuProps extends MenuProps {
  dispatch: Dispatch<any>;
  inverted?: boolean;
}

export const HeaderMenu = ({items, pathname, Link, inverted, dispatch}: HeaderMenuProps) =>
  <Container>
    <Menu size="large" pointing secondary inverted={inverted}>
      <Menu.Item as="a" className="mobile only" icon="sidebar" onClick={() => dispatch(toggleSidebar())}/>
      <Menu.Item as={Link} to="/" name="Gradus Reason Home" className="mobile hidden">
        <img src={logo} alt="Gradus Reason"/>
      </Menu.Item>
      {items.map((item) => {
        const prefixedItemPath = withPrefix(item.path);
        const usingPrefixing = prefixedItemPath !== item.path;
        const active = (usingPrefixing)
          ? (item.exact)
            ? pathname === prefixedItemPath : pathname.startsWith(prefixedItemPath)
          : (item.exact)
            ? pathname === item.path : pathname.startsWith(item.path);
        console.log(`\nwhile processing pathname ${pathname}, considering menu item path ${item.path}.
        Should it be active? ${active}. In this run, are we using prefixing? ${usingPrefixing}.`);
        return <Menu.Item
          as={Link}
          className="mobile hidden"
          name={item.name}
          to={item.path}
          key={item.path}
          active={active}
        />;
      })}
    </Menu>
  </Container>;

export default connect()(HeaderMenu);
