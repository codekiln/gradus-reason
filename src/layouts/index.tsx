import Link from "gatsby-link";
import * as React from "react";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import SidebarMenu from "../components/SidebarMenu/SidebarMenu";
import {Container, Icon, Segment, Sidebar} from "semantic-ui-react";
import "../css/styles.css";
import "../css/responsive.css";
import "../css/semantic.min.css";
import "prismjs/themes/prism-okaidia.css";

export const menuItems = [
    {name: "Home", path: "/", exact: true, icon: "home", inverted: true},
    {name: "Steps", path: "/steps/", exact: false, icon: "newspaper"},
    {name: "About", path: "/about/", exact: true, icon: "info circle"},
];

interface DefaultLayoutProps extends React.HTMLProps<HTMLDivElement> {
    location: {
        pathname: string;
    };
    children: any;
}

export default class DefaultLayout extends React.PureComponent<DefaultLayoutProps, void> {
    render() {
        const {pathname} = this.props.location;
        const isHome = pathname === "/";

        return (
            <Sidebar.Pushable as={Segment}>
                <SidebarMenu Link={Link} pathname={pathname} items={menuItems} visible={false}/>
                <Sidebar.Pusher style={{minHeight: "100vh"}}>
                    {/* Header */}
                    {isHome ? null : <HeaderMenu
                        Link={Link} pathname={pathname} items={menuItems}
                    />}

                    {/* Render children pages */}
                    <div style={{paddingBottom: 60}}>
                        {this.props.children()}
                    </div>

                    {/* Footer */}
                    <Segment inverted vertical style={{position: "absolute", bottom: 0, width: "100%"}}>
                        <Container textAlign="center">
                            <a href={"https://github.com/codekiln/gradus-reason"}>
                                <Icon circular link color="red" size="big" name="github"/>
                                Github
                            </a>
                        </Container>
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}
