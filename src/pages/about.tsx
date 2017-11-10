import * as React from "react";
import {Container, Header, Icon, Segment} from "semantic-ui-react";

export default () => {
    return (
        <Container>
            <Segment vertical>
                <Header as="h2">
                    <Icon name="info circle"/>
                    <Header.Content>
                        About
                    </Header.Content>
                </Header>
            </Segment>
            <Segment vertical>
                <p>
                    This is a collection of field notes collected while learning
                    the <a href="https://reasonml.github.io/">Reason</a> dialect of OCaml.
                </p>
            </Segment>
        </Container>
    );
};
