import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {toggleSidebar} from "../../store";
import {MenuProps} from "../Menu";
import {Container, Icon, Menu} from "semantic-ui-react";
import * as logo from "../../images/icon_75.png";

interface HeaderMenuProps extends MenuProps {
    dispatch: Dispatch<any>;
    inverted?: boolean;
}

export const HeaderMenu = ({items, pathname, Link, inverted, dispatch}: HeaderMenuProps) =>
    <Container>
        <Menu size="large" pointing secondary inverted={inverted}>
            <Menu.Item as="a" className="mobile only" icon="sidebar" onClick={() => dispatch(toggleSidebar())}/>
            <Menu.Item as={Link} to="/" name="Gradus Reson Home" className="mobile hidden">
                <img src={logo} alt="Gradus Reason"/>
            </Menu.Item>
            {items.map((item) => {
                const active = (item.exact) ? pathname === item.path : pathname.startsWith(item.path);
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
